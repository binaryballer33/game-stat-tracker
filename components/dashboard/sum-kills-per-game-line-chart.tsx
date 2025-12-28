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

const CustomDot = (props: any) => {
	const { cx, cy, stroke, value } = props

	if (!cx || !cy) return null

	return (
		<g>
			<circle cx={cx} cy={cy} r={12} fill={stroke} stroke="none" />
			<text
				x={cx}
				y={cy}
				dy={4}
				textAnchor="middle"
				fill="#fff"
				fontSize={10}
				fontWeight="bold"
			>
				{value}
			</text>
		</g>
	)
}

import { RevenueChartProps } from '@/types/dashboard'
import { getCumulativeKills } from '@/lib/data-manipulation/kill-sums-over-time'

export function SumKillsPerGameLineChart({
	selectedPlayer = 'all',
}: RevenueChartProps) {
	const processedData = getCumulativeKills()
	const showAll = selectedPlayer === 'all'

	return (
		<div className="w-full h-full min-h-[350px]">
			<div className="flex items-center gap-4 mb-6">
				<div>
					<div className="flex items-center gap-2">
						<h3 className="text-xl font-bold tracking-tight">
							{showAll
								? 'Combat History'
								: `${selectedPlayer}'s Combat History`}
						</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						{showAll
							? `Tracking Cumulative Kills Per Player From ${dummyData.date}.`
							: `Tracking Cumulative Kills For ${selectedPlayer} From ${dummyData.date}.`}
					</p>
				</div>
			</div>

			<ResponsiveContainer width="100%" height={350}>
				<LineChart
					data={processedData}
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
						label={{ value: 'Game', position: 'insideBottomRight', offset: 0 }}
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
							stroke="var(--chart-1)" // Blue
							strokeWidth={3}
							dot={<CustomDot />}
							activeDot={{ r: 8 }}
						/>
					)}
					{(showAll || selectedPlayer === 'Josh') && (
						<Line
							type="monotone"
							dataKey="Josh"
							stroke="var(--chart-2)" // Teal
							strokeWidth={3}
							dot={<CustomDot />}
							activeDot={{ r: 8 }}
						/>
					)}
					{(showAll || selectedPlayer === 'Mike') && (
						<Line
							type="monotone"
							dataKey="Mike"
							stroke="var(--chart-3)" // Purple
							strokeWidth={3}
							dot={<CustomDot />}
							activeDot={{ r: 8 }}
						/>
					)}
					{(showAll || selectedPlayer === 'Doug') && (
						<Line
							type="monotone"
							dataKey="Doug"
							stroke="var(--destructive)" // Red
							strokeWidth={3}
							dot={<CustomDot />}
							activeDot={{ r: 8 }}
						/>
					)}
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
