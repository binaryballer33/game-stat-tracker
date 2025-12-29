import { db } from '@/firebaseConfig'
import { StatSnapshot, GameData, PlayerName } from '@/types/dashboard'
import {
	collection,
	query,
	where,
	getDocs,
	orderBy,
	Timestamp,
} from 'firebase/firestore'
import { format, startOfDay, endOfDay } from 'date-fns'

export async function getStatsFromFirestore(
	date: Date | undefined,
): Promise<StatSnapshot | null> {
	if (!date) return null

	const start = startOfDay(date)
	const end = endOfDay(date)

	const statsCollection = collection(db, 'stats')
	const q = query(
		statsCollection,
		where('date', '>=', Timestamp.fromDate(start)),
		where('date', '<=', Timestamp.fromDate(end)),
	)

	try {
		const querySnapshot = await getDocs(q)
		if (querySnapshot.empty) return null

		// Aggregate documents into games
		// For now, assuming docs might not have a "game" index, so we group by player
		// and if multiple entries exist for a player, we could potentially treat them as different games.
		// However, based on the user's data, let's start by mapping what we have.

		const gameMap: Record<number, Partial<GameData>> = {}

		querySnapshot.docs.forEach((doc) => {
			const data = doc.data()
			const rawPlayerName = (data.playerName || '').toLowerCase()
			const kills = data.kills || 0
			const gameIndex = data.game || 1 // Default to game 1 if not specified

			if (!gameMap[gameIndex]) {
				gameMap[gameIndex] = {
					game: gameIndex,
					Doug: 0,
					Josh: 0,
					Mike: 0,
					Shaq: 0,
				}
			}

			// Map Firestore player names to our Type names
			let playerName: PlayerName | null = null
			if (rawPlayerName === 'shaq') playerName = 'Shaq'
			if (rawPlayerName === 'josh') playerName = 'Josh'
			if (rawPlayerName === 'doug') playerName = 'Doug'
			if (rawPlayerName === 'mike') playerName = 'Mike'
			if (rawPlayerName === 'mir') playerName = 'Mir'

			if (playerName && playerName !== 'all') {
				gameMap[gameIndex][playerName as keyof GameData] = kills as any
			}
		})

		const games = Object.values(gameMap) as GameData[]
		// Sort by game number
		games.sort((a, b) => a.game - b.game)

		return {
			date: format(date, 'MM-dd-yyyy'),
			games: games,
		} as StatSnapshot
	} catch (error) {
		console.error('Error fetching stats from Firestore:', error)
		return null
	}
}

export async function fetchAllAvailableDates(): Promise<Date[]> {
	const statsRef = collection(db, 'stats')
	const q = query(statsRef, orderBy('date', 'desc'))

	try {
		const querySnapshot = await getDocs(q)
		const datesSet = new Set<string>()
		const dates: Date[] = []

		querySnapshot.docs.forEach((doc) => {
			const timestamp = doc.data().date as Timestamp
			if (timestamp) {
				const d = timestamp.toDate()
				const dateStr = format(d, 'yyyy-MM-dd')
				if (!datesSet.has(dateStr)) {
					datesSet.add(dateStr)
					dates.push(startOfDay(d))
				}
			}
		})
		return dates
	} catch (error) {
		console.error('Error fetching available dates:', error)
		return []
	}
}
