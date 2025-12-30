import { GoogleGenerativeAI } from '@google/generative-ai'
import { ParsedStat } from '@/types/dashboard'

// Note: Typically you'd use a server-side route for this to keep the API key safe.
// However, since this is a local/dev project, we'll use an environment variable.
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
const genAI = new GoogleGenerativeAI(API_KEY)

export async function parseStatsFromImage(file: File): Promise<ParsedStat[]> {
	if (!API_KEY) {
		throw new Error(
			'Gemini API Key not found. Please set NEXT_PUBLIC_GEMINI_API_KEY.',
		)
	}

	const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

	const base64Data = await fileToBase64(file)
	const imagePart = {
		inlineData: {
			data: base64Data.split(',')[1],
			mimeType: file.type,
		},
	}

	const prompt = `
    Analyze this game statistics screenshot and extract the performance data for each player.

    ICON MAPPINGS:
    - Skull icon = Kills
    - X icon = Deaths
    - Hand icon = Assists

    PLAYER NAME ALIASES:
    - "themftruth03" => Josh
    - "Ballerrashad33" => Shaq
    - "GotDatSauce27" => Mike
    - Also look for: "Doug", "Mir"

    EXTRACTION RULES:
    1. Extract data for ALL players visible in the scoreboard.
    2. If a player name matches an alias or one of the known names (Josh, Shaq, Mike, Doug, Mir), use the canonical name.
    3. If the name does not match, extract the name exactly as seen in the image.
    4. For each player, extract: kills, deaths, assists, redeploys.

    Return the data as a JSON array of objects:
    [{ "game": number, "playerName": string, "kills": number, "deaths": number, "assists": number, "redeploys": number }]

    If multiple games are shown, group them by game number. If only one game is shown, use 1.
    If a stat is zero or not visible, use 0.
    Return ONLY the raw JSON array.
  `

	const result = await model.generateContent([prompt, imagePart])
	const response = await result.response
	const text = response.text()

	console.log('Raw Gemini Response:', text)

	// Clean the response text to extract only the JSON
	const start = text.indexOf('[')
	const end = text.lastIndexOf(']')

	if (start === -1 || end === -1) {
		console.error('Gemini did not return a valid JSON array. Raw text:', text)
		throw new Error('Failed to parse JSON from Gemini response')
	}

	const jsonStr = text.substring(start, end + 1)
	console.log('Extracted JSON String:', jsonStr)

	try {
		const data = JSON.parse(jsonStr)
		console.log('Parsed Stats Data:', data)
		return data as ParsedStat[]
	} catch (error) {
		console.error('JSON Parsing Error:', error)
		console.error('Faulty JSON String:', jsonStr)
		throw new Error('Invalid format received from Gemini')
	}
}

function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (error) => reject(error)
	})
}
