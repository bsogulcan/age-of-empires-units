export interface CostFilter {
  enabled: boolean;
  type: 'food' | 'wood' | 'gold';
  displayName: string;
  min: number;
  max: number;
}
