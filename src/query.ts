import { DesignsQuery } from "./sharedTypes";

export function buildDesignsQueryString(query: DesignsQuery) {
  return Object.entries(query)
    .map(([key, value]) => (value !== undefined ? `${key}=${value}` : ""))
    .join("&");
}
