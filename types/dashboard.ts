export type PlayerName = 'Doug' | 'Josh' | 'Mike' | 'Shaq' | 'Mir' | 'all'

export type StatChartProps = {
	selectedPlayer?: PlayerName
}

export type StatsPerGameBarChartProps = StatChartProps & {
	cumulative?: boolean
}
