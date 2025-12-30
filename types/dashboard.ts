export type PlayerName = 'Doug' | 'Josh' | 'Mike' | 'Shaq' | 'Mir' | 'all'

export interface GameData {
	game: number
	Doug: number
	Josh: number
	Mike: number
	Shaq: number
	deaths?: Record<PlayerName, number>
	assists?: Record<PlayerName, number>
	redeploys?: Record<PlayerName, number>
}

export interface ParsedStat {
	game: number
	playerName: PlayerName
	kills: number
	deaths: number
	assists: number
	redeploys: number
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
