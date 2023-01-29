export function convertFiltersToUrl(filters) {
    return Array.from(filters.entries())
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
}
