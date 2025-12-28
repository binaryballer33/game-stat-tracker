'use client'

import * as React from 'react'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	SortingState,
	getFilteredRowModel,
} from '@tanstack/react-table'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PlayerName, GameData } from '@/types/dashboard'

const columns: ColumnDef<GameData>[] = [
	{
		accessorKey: 'game',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="hover:bg-transparent p-0 font-medium"
				>
					Game #
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className="font-medium">Game {row.getValue('game')}</div>
		),
	},
	{
		accessorKey: 'Doug',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="hover:bg-transparent p-0 font-medium"
				>
					Doug
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'Josh',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="hover:bg-transparent p-0 font-medium"
				>
					Josh
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'Mike',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="hover:bg-transparent p-0 font-medium"
				>
					Mike
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'Shaq',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="hover:bg-transparent p-0 font-medium"
				>
					Shaq
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
]

interface KillsPerGameTableProps {
	selectedPlayer?: PlayerName
	data?: GameData[]
}

export function KillsPerGameTable({
	selectedPlayer = 'all',
	data = [],
}: KillsPerGameTableProps) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = React.useState('')

	// Memoize columns to filter based on selectedPlayer
	const filteredColumns = React.useMemo(() => {
		if (selectedPlayer === 'all') return columns
		return columns.filter(
			(col) =>
				(col as any).accessorKey === 'game' ||
				(col as any).accessorKey === selectedPlayer,
		)
	}, [selectedPlayer])

	const table = useReactTable({
		data,
		columns: filteredColumns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
	})

	const totals = React.useMemo(() => {
		return data.reduce(
			(acc, game) => {
				acc.Doug += game.Doug
				acc.Josh += game.Josh
				acc.Mike += game.Mike
				acc.Shaq += game.Shaq
				return acc
			},
			{ Doug: 0, Josh: 0, Mike: 0, Shaq: 0 },
		)
	}, [data])

	return (
		<div className="w-full space-y-4">
			<div className="flex items-center justify-between">
				<Input
					placeholder="Filter games..."
					value={globalFilter ?? ''}
					onChange={(event) => setGlobalFilter(event.target.value)}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={filteredColumns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell className="font-bold">Grand Total</TableCell>
							{(selectedPlayer === 'all' || selectedPlayer === 'Doug') && (
								<TableCell className="font-bold">{totals.Doug}</TableCell>
							)}
							{(selectedPlayer === 'all' || selectedPlayer === 'Josh') && (
								<TableCell className="font-bold">{totals.Josh}</TableCell>
							)}
							{(selectedPlayer === 'all' || selectedPlayer === 'Mike') && (
								<TableCell className="font-bold">{totals.Mike}</TableCell>
							)}
							{(selectedPlayer === 'all' || selectedPlayer === 'Shaq') && (
								<TableCell className="font-bold">{totals.Shaq}</TableCell>
							)}
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	)
}
