/** 所有站內連結都經過這裡，避免在元件中硬編碼 `/` 開頭路徑（AGENTS.md §9）。 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : '/' + path;
  return base + p;
}

export function fmtDate(d: Date | undefined): string {
  return d ? d.toISOString().slice(0, 10) : '';
}
