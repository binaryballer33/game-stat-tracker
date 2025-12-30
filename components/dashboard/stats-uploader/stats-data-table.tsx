'use client'

import * as React from 'react'
import { ParsedStat, PlayerName } from '@/types/dashboard'
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

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StatsDataTableProps {
	data: ParsedStat[]
	setData: (data: ParsedStat[]) => void
}

export function StatsDataTable({ data, setData }: StatsDataTableProps) {
	const handleValueChange = (
		index: number,
		field: keyof ParsedStat,
		value: string,
	) => {
		const newData = [...data]
		if (field === 'playerName') {
			newData[index].playerName = value as PlayerName
		} else {
			newData[index][field as keyof Omit<ParsedStat, 'playerName'>] =
				parseInt(value) || 0
		}
		setData(newData)
	}

	const handleDeleteRow = (index: number) => {
		const newData = data.filter((_, i) => i !== index)
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
						<TableHead className="w-[50px]"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row, index) => (
						<TableRow key={`${row.game}-${row.playerName}-${index}`}>
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
							<TableCell className="font-medium">
								<Input
									value={row.playerName}
									onChange={(e) =>
										handleValueChange(index, 'playerName', e.target.value)
									}
									className="h-8 w-32"
								/>
							</TableCell>
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
							<TableCell>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
									onClick={() => handleDeleteRow(index)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
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
						<TableCell></TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	)
}
