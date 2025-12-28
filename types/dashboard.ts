export type PlayerName = 'Doug' | 'Josh' | 'Mike' | 'Shaq' | 'Mir' | 'all'

export interface GameData {
	game: number
	Doug: number
	Josh: number
	Mike: number
	Shaq: number
}

export interface StatSnapshot {
	date: string
	games: GameData[]
}

export type StatChartProps = {
	selectedPlayer?: PlayerName
	data?: GameData[]
}

export type StatsPerGameBarChartProps = StatChartProps & {
	cumulative?: boolean
}
