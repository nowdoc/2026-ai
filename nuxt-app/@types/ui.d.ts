namespace UI {
  interface TableFetcherCtx {
    q: Record<string, string> | null,
    qs: string | null,
    page: number,
    limit: number,
    sort: string | null,
    order: "asc" | "desc" | null
  }
}
