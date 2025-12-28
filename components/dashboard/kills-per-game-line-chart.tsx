'use client'

import {
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	Tooltip,
	YAxis,
	CartesianGrid,
	Legend,
} from 'recharts'
import { dummyData } from '@/lib/hard-coded-data/dec-27-2025'

interface KillsPerGameLineChartProps {
	selectedPlayer?: 'Doug' | 'Josh' | 'Mike' | 'Shaq' | 'all'
}

export function KillsPerGameLineChart({
	selectedPlayer = 'all',
}: KillsPerGameLineChartProps) {
	const showAll = selectedPlayer === 'all'

	return (
		<div className="w-full h-full min-h-[350px]">
			<div className="flex items-center gap-4 mb-6">
				<div>
					<div className="flex items-center gap-2">
						<h3 className="text-xl font-bold tracking-tight">Game Stats</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						Kills Per Player From {dummyData.date}.
					</p>
				</div>
			</div>

			<ResponsiveContainer width="100%" height={350}>
				<LineChart
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
						<Line
							type="monotone"
							dataKey="Shaq"
							stroke="var(--chart-1)"
							strokeWidth={2}
							dot={{ r: 4, fill: 'var(--chart-1)' }}
							activeDot={{ r: 6 }}
							name="Shaq"
						/>
					)}
					{(showAll || selectedPlayer === 'Josh') && (
						<Line
							type="monotone"
							dataKey="Josh"
							stroke="var(--chart-2)"
							strokeWidth={2}
							dot={{ r: 4, fill: 'var(--chart-2)' }}
							activeDot={{ r: 6 }}
							name="Josh"
						/>
					)}
					{(showAll || selectedPlayer === 'Mike') && (
						<Line
							type="monotone"
							dataKey="Mike"
							stroke="var(--chart-3)"
							strokeWidth={2}
							dot={{ r: 4, fill: 'var(--chart-3)' }}
							activeDot={{ r: 6 }}
							name="Mike"
						/>
					)}
					{(showAll || selectedPlayer === 'Doug') && (
						<Line
							type="monotone"
							dataKey="Doug"
							stroke="var(--destructive)"
							strokeWidth={2}
							dot={{ r: 4, fill: 'var(--destructive)' }}
							activeDot={{ r: 6 }}
							name="Doug"
						/>
					)}
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
