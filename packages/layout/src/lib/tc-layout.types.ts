export type TcContainerSize = 'default' | 'narrow' | 'compact' | 'full';
export type TcDividerSpacing = 'sm' | 'md' | 'lg';
export type TcGridCols = 1 | 2 | 3 | 4;
export type TcGridGap = 'md' | 'lg' | 'xl';

export interface TcStatItem {
  label: string;
  value: string | number;
  icon?: string;
  bgColor?: string;
  iconColor?: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  trend?: string;
  trendDirection?: 'up' | 'down';
}
