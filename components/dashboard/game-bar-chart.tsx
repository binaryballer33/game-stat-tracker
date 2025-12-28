'use client'

import {
	Bar,
	BarChart,
	ResponsiveContainer,
	XAxis,
	Tooltip,
	YAxis,
	CartesianGrid,
	Legend,
} from 'recharts'
import { dummyData } from '@/lib/hard-coded-data/dec-27-2025'

interface GameBarChartProps {
	selectedPlayer?: 'Doug' | 'Josh' | 'Mike' | 'Shaq' | 'all'
}

export function GameBarChart({ selectedPlayer = 'all' }: GameBarChartProps) {
	const showAll = selectedPlayer === 'all'

	return (
		<div className="w-full h-full min-h-[350px]">
			<div className="flex items-center gap-4 mb-6">
				<div>
					<div className="flex items-center gap-2">
						<h3 className="text-xl font-bold tracking-tight">Game Stats</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						Grouped Kills Per Player From {dummyData.date}.
					</p>
				</div>
			</div>

			<ResponsiveContainer width="100%" height={350}>
				<BarChart
					data={dummyData.games}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
						stroke="var(--border)"
					/>
					<XAxis
						dataKey="game"
						stroke="#888888"
						fontSize={12}
						tickLine={false}
						axisLine={false}
						tickMargin={10}
						tickFormatter={(value) => `G${value}`}
					/>
					<YAxis
						stroke="#888888"
						fontSize={12}
						tickLine={false}
						axisLine={false}
						width={40}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: 'var(--card)',
							color: 'var(--card-foreground)',
							borderRadius: '8px',
							borderColor: 'var(--border)',
							fontSize: '12px',
						}}
					/>
					<Legend verticalAlign="top" height={36} />

					{(showAll || selectedPlayer === 'Shaq') && (
						<Bar
							dataKey="Shaq"
							fill="var(--chart-1)"
							radius={[4, 4, 0, 0]}
							name="Shaq"
						/>
					)}
					{(showAll || selectedPlayer === 'Josh') && (
						<Bar
							dataKey="Josh"
							fill="var(--chart-2)"
							radius={[4, 4, 0, 0]}
							name="Josh"
						/>
					)}
					{(showAll || selectedPlayer === 'Mike') && (
						<Bar
							dataKey="Mike"
							fill="var(--chart-3)"
							radius={[4, 4, 0, 0]}
							name="Mike"
						/>
					)}
					{(showAll || selectedPlayer === 'Doug') && (
						<Bar
							dataKey="Doug"
							fill="var(--destructive)"
							radius={[4, 4, 0, 0]}
							name="Doug"
						/>
					)}
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}
