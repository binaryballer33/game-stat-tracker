import { StatSnapshot } from '@/types/dashboard'
import { dummyData as dataDec26 } from '@/lib/hard-coded-data/dec-26-2025'
import { dummyData as dataDec27 } from '@/lib/hard-coded-data/dec-27-2025'
import { format } from 'date-fns'

const dataMap: Record<string, StatSnapshot> = {
	'12-26-2025': dataDec26 as StatSnapshot,
	'12-27-2025': dataDec27 as StatSnapshot,
}

export function getStatsForDate(date: Date | undefined) {
	if (!date) return dataDec27 as StatSnapshot // Default to latest

	const dateStr = format(date, 'MM-dd-yyyy')
	return dataMap[dateStr] || null
}

export function getAvailableDates() {
	return Object.keys(dataMap).map((dateStr) => {
		const [month, day, year] = dateStr.split('-').map(Number)
		return new Date(year, month - 1, day)
	})
}
