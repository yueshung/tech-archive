import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './url';

export type Kind = 'projects' | 'knowledge' | 'notes';
export type AnyEntry =
  | CollectionEntry<'projects'>
  | CollectionEntry<'knowledge'>
  | CollectionEntry<'notes'>;

export interface Source {
  title: string;
  url: string;
  author?: string;
  organization?: string;
  publishedAt?: Date;
  accessedAt?: Date;
}

export interface Item {
  kind: Kind;
  slug: string;
  title: string;
  description: string;
  category?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  related: string[];
  sources: Source[];
  url: string;
  entry: AnyEntry;
}

export const KIND_LABEL: Record<Kind, string> = {
  projects: 'Project',
  knowledge: 'Knowledge',
  notes: 'Note',
};

function toItem(kind: Kind, entry: AnyEntry): Item {
  const d = entry.data;
  return {
    kind,
    slug: d.slug,
    title: d.title,
    description: d.description,
    category: d.category,
    tags: d.tags,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    related: d.related,
    sources: d.sources,
    url: withBase(`/${kind}/${d.slug}/`),
    entry,
  };
}

/**
 * 唯一的公開內容入口：只回傳 status === 'published' 的內容。
 * 列表、路由、搜尋、Graph、Sitemap、RSS 都必須透過此函式取得資料，
 * 不可直接 getCollection() 後再用前端隱藏草稿。
 */
export async function getItems(kind?: Kind): Promise<Item[]> {
  const kinds: Kind[] = kind ? [kind] : ['projects', 'knowledge', 'notes'];
  const out: Item[] = [];
  for (const k of kinds) {
    const entries = (await getCollection(k, (e) => e.data.status === 'published')) as AnyEntry[];
    for (const e of entries) out.push(toItem(k, e));
  }
  return out.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime() || a.title.localeCompare(b.title));
}

export async function getItemMap(): Promise<Map<string, Item>> {
  const all = await getItems();
  return new Map(all.map((i) => [i.slug, i]));
}

/** related 欄位指向的已發布內容（未發布或不存在者不會出現） */
export function resolveRelated(item: Item, map: Map<string, Item>): Item[] {
  return item.related.map((s) => map.get(s)).filter((i): i is Item => Boolean(i));
}

/** Backlinks：由資料反向計算，不需手動維護 */
export function getBacklinks(slug: string, all: Item[]): Item[] {
  return all.filter((i) => i.slug !== slug && i.related.includes(slug));
}

export function countBy(values: string[]): [string, number][] {
  const m = new Map<string, number>();
  for (const v of values) m.set(v, (m.get(v) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function allTags(items: Item[]): [string, number][] {
  return countBy(items.flatMap((i) => i.tags));
}

export function allCategories(items: Item[]): [string, number][] {
  return countBy(items.map((i) => i.category).filter((c): c is string => Boolean(c)));
}

export function uniqueSources(items: Item[]): Source[] {
  const m = new Map<string, Source>();
  for (const i of items) for (const s of i.sources) if (!m.has(s.url)) m.set(s.url, s);
  return [...m.values()];
}

export interface GraphData {
  nodes: { id: string; title: string; kind: Kind; url: string; description: string; degree: number }[];
  edges: { source: string; target: string }[];
}

/** Knowledge Graph：節點只來自已發布內容，邊只來自明確的 related 欄位。 */
export function buildGraph(items: Item[]): GraphData {
  const ids = new Set(items.map((i) => i.slug));
  const seen = new Set<string>();
  const edges: GraphData['edges'] = [];
  for (const i of items) {
    for (const r of i.related) {
      if (!ids.has(r) || r === i.slug) continue;
      const key = [i.slug, r].sort().join('::');
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ source: i.slug, target: r });
    }
  }
  const degree = new Map<string, number>();
  for (const e of edges) {
    degree.set(e.source, (degree.get(e.source) ?? 0) + 1);
    degree.set(e.target, (degree.get(e.target) ?? 0) + 1);
  }
  return {
    nodes: items.map((i) => ({
      id: i.slug,
      title: i.title,
      kind: i.kind,
      url: i.url,
      description: i.description,
      degree: degree.get(i.slug) ?? 0,
    })),
    edges,
  };
}
