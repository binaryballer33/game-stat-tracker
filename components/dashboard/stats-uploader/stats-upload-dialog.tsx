'use client'

import * as React from 'react'
import Papa from 'papaparse'
import {
	Upload,
	Loader2,
	Calendar as CalendarIcon,
	CheckCircle2,
	Image as ImageIcon,
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { PlayerName, ParsedStat } from '@/types/dashboard'
import { StatsDataTable } from './stats-data-table'
import { batchInsertStatsFromCsv } from '@/lib/data-fetching/batch-insert-stats-from-csv'
import { parseStatsFromImage } from '../../../lib/gemini-stats-parser'

export type UploadMode = 'csv' | 'image'

interface StatsUploadDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSuccess: () => void
	mode: UploadMode
}

export function StatsUploadDialog({
	open,
	onOpenChange,
	onSuccess,
	mode,
}: StatsUploadDialogProps) {
	const [data, setData] = React.useState<ParsedStat[]>([])
	const [uploading, setUploading] = React.useState(false)
	const [parsing, setParsing] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const [date, setDate] = React.useState<Date | null>(new Date()) // Default to today for images
	const fileInputRef = React.useRef<HTMLInputElement>(null)

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0]
		if (!file) return

		setError(null)
		if (mode === 'csv') {
			Papa.parse(file, {
				header: true,
				dynamicTyping: true,
				skipEmptyLines: true,
				transformHeader: (header) => header.trim(),
				complete: (results) => {
					const rawRows = results.data as Array<
						Record<string, string | number | null>
					>
					if (rawRows.length === 0) {
						setError('No records found in CSV.')
						return
					}

					const firstDateStr = rawRows[0].Date || rawRows[0].date
					if (firstDateStr) setDate(new Date(String(firstDateStr)))

					const parsedStats: ParsedStat[] = rawRows
						.map((row) => ({
							game: Number(row.Game || row.game || 1),
							playerName: (row.PlayerName ||
								row.playerName ||
								'') as PlayerName,
							kills: Number(row.Kills || row.kills || 0),
							deaths: Number(row.Deaths || row.deaths || 0),
							assists: Number(row.Assists || row.assists || 0),
							redeploys: Number(row.Redeploys || row.redeploys || 0),
						}))
						.filter(
							(stat) =>
								stat.kills !== 0 ||
								stat.deaths !== 0 ||
								stat.assists !== 0 ||
								stat.redeploys !== 0,
						)

					if (parsedStats.length === 0) {
						setError('No stats found for valid players.')
					} else {
						setData(parsedStats.sort((a, b) => a.game - b.game))
					}
				},
				error: (err) => {
					console.error('CSV Parsing Error:', err)
					setError('Failed to parse CSV file.')
				},
			})
		} else {
			setParsing(true)
			try {
				const stats = await parseStatsFromImage(file)
				if (stats.length === 0) {
					console.warn('Gemini returned zero stats for the provided image.')
					setError(
						"Gemini analyzed the image but couldn't find stats for any of our players (Doug, Josh, Mike, Shaq, Mir). Make sure the screenshot shows the scoreboard clearly.",
					)
				} else {
					setData(stats)
				}
			} catch (err: any) {
				console.error('Image Parsing Error:', err)
				setError(
					`Error: ${
						err.message ||
						'Gemini failed to analyze the image. Please check your API key.'
					}`,
				)
			} finally {
				setParsing(false)
			}
		}
	}

	const handleUpload = async () => {
		if (!date || data.length === 0) return

		setUploading(true)
		try {
			await batchInsertStatsFromCsv(date, data)
			onSuccess()
			onOpenChange(false)
			setData([])
			setDate(new Date())
		} catch (error) {
			console.error('Upload failed:', error)
		} finally {
			setUploading(false)
		}
	}

	const triggerFileSelect = () => {
		fileInputRef.current?.click()
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[900px]">
				<DialogHeader>
					<DialogTitle>
						{mode === 'csv'
							? 'Upload CSV Statistics'
							: 'Analyze Stats from Image'}
					</DialogTitle>
					<DialogDescription>
						{mode === 'csv'
							? 'Upload a CSV file with game statistics. Players with no stats will be automatically omitted.'
							: 'Upload a screenshot of your post-game stats. Gemini will analyze the image and extract the data for you.'}
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					{data.length === 0 ? (
						<div
							className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 cursor-pointer hover:bg-accent transition-colors"
							onClick={triggerFileSelect}
						>
							{parsing ? (
								<div className="flex flex-col items-center">
									<Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
									<p className="text-lg font-medium text-center">
										Gemini is analyzing your image...
									</p>
									<p className="text-sm text-muted-foreground mt-2">
										This may take a few seconds.
									</p>
								</div>
							) : (
								<>
									{mode === 'csv' ? (
										<Upload className="h-12 w-12 text-muted-foreground mb-4" />
									) : (
										<ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
									)}
									<p className="text-lg font-medium">
										Click to upload {mode === 'csv' ? 'CSV' : 'Image'}
									</p>
									<p className="text-sm text-muted-foreground text-center">
										{mode === 'csv'
											? 'Headers should include: Date, Game, PlayerName, Kills, Deaths, Assists, Redeploys'
											: 'Supported formats: PNG, JPG, WebP'}
									</p>
									{error && (
										<p className="text-sm text-destructive mt-4 font-medium max-w-[80%] text-center">
											{error}
										</p>
									)}
								</>
							)}
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleFileUpload}
								accept={mode === 'csv' ? '.csv' : 'image/*'}
								className="hidden"
								disabled={parsing}
							/>
						</div>
					) : (
						<div className="space-y-4">
							<div className="flex items-center justify-between text-sm">
								<div className="flex items-center space-x-2">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className={cn(
													'w-[240px] justify-start text-left font-normal h-9',
													!date && 'text-muted-foreground',
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{date ? format(date, 'PPP') : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={date || undefined}
												onSelect={(newDate) => setDate(newDate || new Date())}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<span className="text-muted-foreground px-2">|</span>
									<span className="text-muted-foreground">
										{data.length} records found
									</span>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setData([])}
									className="text-muted-foreground"
								>
									Clear and Upload Again
								</Button>
							</div>
							<StatsDataTable data={data} setData={setData} />
						</div>
					)}
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={uploading || parsing}
					>
						Cancel
					</Button>
					<Button
						onClick={handleUpload}
						disabled={uploading || parsing || data.length === 0}
						className="min-w-[120px]"
					>
						{uploading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Uploading...
							</>
						) : (
							<>
								<CheckCircle2 className="mr-2 h-4 w-4" />
								Upload Stats
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
