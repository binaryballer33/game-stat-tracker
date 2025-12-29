'use client'

import * as React from 'react'
import Papa from 'papaparse'
import { Upload, Loader2, FileText, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { PlayerName, ParsedStat } from '@/types/dashboard'
import { CsvDataTable } from './csv-data-table'
import { batchInsertStatsFromCsv } from '@/lib/data-fetching/batch-insert-stats-from-csv'

interface CsvUploadDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSuccess: () => void
}

export function CsvUploadDialog({
	open,
	onOpenChange,
	onSuccess,
}: CsvUploadDialogProps) {
	const [data, setData] = React.useState<ParsedStat[]>([])
	const [uploading, setUploading] = React.useState(false)
	const [date, setDate] = React.useState<Date | null>(null)
	const fileInputRef = React.useRef<HTMLInputElement>(null)

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true,
			transformHeader: (header) => header.trim(),
			complete: (results) => {
				const rawRows = results.data as Record<string, any>[]
				if (rawRows.length === 0) return

				const firstDate = new Date(rawRows[0].Date)
				setDate(firstDate)

				const parsedStats: ParsedStat[] = rawRows
					.map((row) => ({
						game: row.Game || 1,
						playerName: row.PlayerName as PlayerName,
						kills: row.Kills || 0,
						deaths: row.Deaths || 0,
						assists: row.Assists || 0,
						redeploys: row.Redeploys || 0,
					}))
					// Omit players with no stats across all categories
					.filter(
						(stat) =>
							stat.kills !== 0 ||
							stat.deaths !== 0 ||
							stat.assists !== 0 ||
							stat.redeploys !== 0,
					)

				setData(parsedStats.sort((a, b) => a.game - b.game))
			},
			error: (error) => {
				console.error('CSV Parsing Error:', error)
			},
		})
	}

	const handleUpload = async () => {
		if (!date || data.length === 0) return

		setUploading(true)
		try {
			await batchInsertStatsFromCsv(date, data)
			onSuccess()
			onOpenChange(false)
			setData([])
			setDate(null)
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
					<DialogTitle>Upload Statistics</DialogTitle>
					<DialogDescription>
						Upload A CSV File With Game Statistics. Players With No Stats Will
						Be Automatically Omitted.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					{data.length === 0 ? (
						<div
							className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 cursor-pointer hover:bg-accent transition-colors"
							onClick={triggerFileSelect}
						>
							<Upload className="h-12 w-12 text-muted-foreground mb-4" />
							<p className="text-lg font-medium">Click To Upload CSV</p>
							<p className="text-sm text-muted-foreground text-center">
								Headers Should Include: Date, Game, PlayerName, Kills, Deaths,
								Assists, Redeploys
							</p>
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleFileUpload}
								accept=".csv"
								className="hidden"
							/>
						</div>
					) : (
						<div className="space-y-4">
							<div className="flex items-center justify-between text-sm">
								<div className="flex items-center space-x-2">
									<FileText className="h-4 w-4 text-primary" />
									<span className="font-medium">
										{date ? date.toLocaleDateString() : 'No date found'}
									</span>
									<span className="text-muted-foreground px-2">|</span>
									<span className="text-muted-foreground">
										{data.length} Records Found
									</span>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setData([])}
									className="text-muted-foreground"
								>
									Clear And Upload Again
								</Button>
							</div>
							<CsvDataTable data={data} setData={setData} />
						</div>
					)}
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={uploading}
					>
						Cancel
					</Button>
					<Button
						onClick={handleUpload}
						disabled={uploading || data.length === 0}
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
