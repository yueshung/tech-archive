// Astro 6：Content Layer API，設定檔位於 src/content.config.ts（舊的 src/content/config.ts 已不支援）
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug 必須是小寫 kebab-case');
const tag = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'tag 必須是小寫 kebab-case');

const source = z.object({
  title: z.string(),
  url: z.url(),
  author: z.string().optional(),
  organization: z.string().optional(),
  publishedAt: z.coerce.date().optional(),
  accessedAt: z.coerce.date().optional(),
});

const base = {
  title: z.string().min(1),
  slug,
  description: z.string().min(1),
  status: z.enum(['draft', 'review', 'published', 'archived']),
  tags: z.array(tag).default([]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  related: z.array(slug).default([]),
  sources: z.array(source).default([]),
};

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    ...base,
    category: z.string().optional(),
    techStack: z.array(z.string()).default([]),
    githubUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
    role: z.string().optional(),
    projectType: z.string().optional(),
    // readme：已閱讀 README；structure-only：僅能確認目錄結構（無 README）
    evidenceLevel: z.enum(['readme', 'structure-only']).default('readme'),
  }),
});

const knowledge = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/knowledge' }),
  schema: z.object({ ...base, category: z.string().min(1) }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/notes' }),
  schema: z.object({ ...base, category: z.string().optional() }),
});

// wiki/ 目錄：LLM Wiki 整理後的內容與來源紀錄
const wiki = defineCollection({
  loader: glob({ pattern: ['*.md', 'SOURCES/*.md'], base: './wiki' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['draft', 'review', 'published', 'archived']).default('published'),
    type: z.enum(['wiki', 'index', 'sources', 'source', 'log']),
    updatedAt: z.coerce.date().optional(),
    url: z.url().optional(),
    organization: z.string().optional(),
    author: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    accessedAt: z.coerce.date().optional(),
    usedIn: z.array(slug).default([]),
  }),
});

export const collections = { projects, knowledge, notes, wiki };
