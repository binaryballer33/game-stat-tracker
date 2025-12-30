import { db } from '@/firebaseConfig'
import { ParsedStat } from '@/types/dashboard'
import { collection, Timestamp, writeBatch, doc } from 'firebase/firestore'
import { startOfDay } from 'date-fns'

export async function batchInsertStatsFromCsv(
	date: Date,
	stats: ParsedStat[],
): Promise<void> {
	const statsCollection = collection(db, 'stats')
	const batch = writeBatch(db)

	const timestamp = Timestamp.fromDate(startOfDay(date))

	stats.forEach((stat) => {
		const docRef = doc(statsCollection)
		batch.set(docRef, {
			date: timestamp,
			playerName: stat.playerName,
			game: stat.game,
			kills: stat.kills,
			deaths: stat.deaths,
			assists: stat.assists,
			redeploys: stat.redeploys,
		})
	})

	try {
		await batch.commit()
	} catch (error) {
		console.error('Error Uploading Stats To Firestore:', error)
		throw error
	}
}
