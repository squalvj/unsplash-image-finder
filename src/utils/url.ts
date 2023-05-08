export function getQueryParam(name: string, url?: string): string | null {
    const searchParams = new URLSearchParams(url ? new URL(url).search : window.location.search);
    return searchParams.get(name);
  }
  