import { dummyData } from '../hard-coded-data/dec-27-2025'

export type CumulativeKillData = {
	game: string
	Doug: number
	Josh: number
	Mike: number
	Shaq: number
}

export function getCumulativeKills(): CumulativeKillData[] {
	const cumulative = { Doug: 0, Josh: 0, Mike: 0, Shaq: 0 }

	return dummyData.games.map((game) => {
		cumulative.Doug += game.Doug
		cumulative.Josh += game.Josh
		cumulative.Mike += game.Mike
		cumulative.Shaq += game.Shaq
		return {
			game: game.game.toString(),
			Doug: cumulative.Doug,
			Josh: cumulative.Josh,
			Mike: cumulative.Mike,
			Shaq: cumulative.Shaq,
		}
	})
}
