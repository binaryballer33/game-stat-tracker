import { ParsedStat } from '@/types/dashboard'
import { parseStatsFromImageAction } from './actions/gemini-stats'

export async function parseStatsFromImage(file: File): Promise<ParsedStat[]> {
	const base64WithHeader = await fileToBase64(file)
	const [header, base64Data] = base64WithHeader.split(',')
	const mimeType = header.split(':')[1].split(';')[0]

	return await parseStatsFromImageAction(base64Data, mimeType)
}

function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (error) => reject(error)
	})
}
