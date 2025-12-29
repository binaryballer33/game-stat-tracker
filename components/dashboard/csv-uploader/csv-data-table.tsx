'use client'

import * as React from 'react'
import { ParsedStat } from '@/types/dashboard'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from '@/components/ui/table'

interface CsvDataTableProps {
	data: ParsedStat[]
	setData: (data: ParsedStat[]) => void
}

export function CsvDataTable({ data, setData }: CsvDataTableProps) {
	const handleValueChange = (
		index: number,
		field: keyof ParsedStat,
		value: string,
	) => {
		const newData = [...data]
		if (field === 'playerName') {
			newData[index].playerName = value as any
		} else {
			newData[index][field] = parseInt(value) || 0
		}
		setData(newData)
	}

	const totals = data.reduce(
		(acc, curr) => ({
			kills: acc.kills + (curr.kills || 0),
			deaths: acc.deaths + (curr.deaths || 0),
			assists: acc.assists + (curr.assists || 0),
			redeploys: acc.redeploys + (curr.redeploys || 0),
		}),
		{ kills: 0, deaths: 0, assists: 0, redeploys: 0 },
	)

	return (
		<div className="rounded-md border max-h-[400px] overflow-auto">
			<Table>
				<TableHeader className="sticky top-0 bg-background z-10">
					<TableRow>
						<TableHead className="w-[80px]">Game</TableHead>
						<TableHead>Player</TableHead>
						<TableHead className="text-right">Kills</TableHead>
						<TableHead className="text-right">Deaths</TableHead>
						<TableHead className="text-right">Assists</TableHead>
						<TableHead className="text-right">Redeploys</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row, index) => (
						<TableRow key={`${row.game}-${row.playerName}`}>
							<TableCell>
								<Input
									type="number"
									value={row.game}
									onChange={(e) =>
										handleValueChange(index, 'game', e.target.value)
									}
									className="h-8 w-16"
								/>
							</TableCell>
							<TableCell className="font-medium">{row.playerName}</TableCell>
							<TableCell>
								<Input
									type="number"
									value={row.kills}
									onChange={(e) =>
										handleValueChange(index, 'kills', e.target.value)
									}
									className="h-8 w-20 ml-auto text-right"
								/>
							</TableCell>
							<TableCell>
								<Input
									type="number"
									value={row.deaths}
									onChange={(e) =>
										handleValueChange(index, 'deaths', e.target.value)
									}
									className="h-8 w-20 ml-auto text-right"
								/>
							</TableCell>
							<TableCell>
								<Input
									type="number"
									value={row.assists}
									onChange={(e) =>
										handleValueChange(index, 'assists', e.target.value)
									}
									className="h-8 w-20 ml-auto text-right"
								/>
							</TableCell>
							<TableCell>
								<Input
									type="number"
									value={row.redeploys}
									onChange={(e) =>
										handleValueChange(index, 'redeploys', e.target.value)
									}
									className="h-8 w-20 ml-auto text-right"
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter className="sticky bottom-0 bg-muted/50 font-bold">
					<TableRow>
						<TableCell colSpan={2}>Totals</TableCell>
						<TableCell className="text-right pr-4">{totals.kills}</TableCell>
						<TableCell className="text-right pr-4">{totals.deaths}</TableCell>
						<TableCell className="text-right pr-4">{totals.assists}</TableCell>
						<TableCell className="text-right pr-4">
							{totals.redeploys}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	)
}
