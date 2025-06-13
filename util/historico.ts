import { Ranking } from "@/model/ranking";

export function hasRanking(rankings: Ranking[], ranking: Ranking): boolean {
  return rankings.find((r) => r.getUuid() === ranking.getUuid()) !== undefined;
}
