export type PlayerName = 'Doug' | 'Josh' | 'Mike' | 'Shaq'

export interface RevenueChartProps {
	selectedPlayer?: PlayerName | 'all'
}

export interface KillsPerGameBarChartProps {
	selectedPlayer?: PlayerName | 'all'
}
