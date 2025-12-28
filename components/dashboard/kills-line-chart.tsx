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
import { RevenueChartProps } from '@/types/dashboard'
import { getCumulativeKills } from '@/lib/data-manipulation/kill-sums-over-time'

const CustomDot = (props: {
	cx?: number
	cy?: number
	stroke?: string
	value?: number
}) => {
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

interface KillsLineChartProps extends RevenueChartProps {
	cumulative?: boolean
}

export function KillsLineChart({
	selectedPlayer = 'all',
	cumulative = false,
}: KillsLineChartProps) {
	const data = cumulative ? getCumulativeKills() : dummyData.games
	const showAll = selectedPlayer === 'all'

	// Chart Title & Description
	const chartTitle = showAll ? 'Game Stats' : `${selectedPlayer}'s Game Stats`

	let chartDescription = ''
	if (cumulative) {
		chartDescription = showAll
			? `Tracking Cumulative Kills Per Player From ${dummyData.date}.`
			: `Tracking Cumulative Kills For ${selectedPlayer} From ${dummyData.date}.`
	} else {
		chartDescription = showAll
			? `Kills Per Player From ${dummyData.date}.`
			: `Kills For ${selectedPlayer} From ${dummyData.date}.`
	}

	// Line Configuration
	const lineStrokeWidth = cumulative ? 3 : 2
	const lineActiveDotRadius = cumulative ? 8 : 6

	const getLineDot = (chartColor: string) => {
		if (cumulative) {
			return <CustomDot />
		}
		return { r: 4, fill: chartColor }
	}

	return (
		<div className="w-full h-full min-h-[350px]">
			<div className="flex items-center gap-4 mb-6">
				<div>
					<div className="flex items-center gap-2">
						<h3 className="text-xl font-bold tracking-tight">{chartTitle}</h3>
					</div>
					<p className="text-sm text-muted-foreground">{chartDescription}</p>
				</div>
			</div>

			<ResponsiveContainer width="100%" height={350}>
				<LineChart
					data={data}
					margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
							strokeWidth={lineStrokeWidth}
							dot={getLineDot('var(--chart-1)')}
							activeDot={{ r: lineActiveDotRadius }}
							name="Shaq"
						/>
					)}
					{(showAll || selectedPlayer === 'Josh') && (
						<Line
							type="monotone"
							dataKey="Josh"
							stroke="var(--chart-2)"
							strokeWidth={lineStrokeWidth}
							dot={getLineDot('var(--chart-2)')}
							activeDot={{ r: lineActiveDotRadius }}
							name="Josh"
						/>
					)}
					{(showAll || selectedPlayer === 'Mike') && (
						<Line
							type="monotone"
							dataKey="Mike"
							stroke="var(--chart-3)"
							strokeWidth={lineStrokeWidth}
							dot={getLineDot('var(--chart-3)')}
							activeDot={{ r: lineActiveDotRadius }}
							name="Mike"
						/>
					)}
					{(showAll || selectedPlayer === 'Doug') && (
						<Line
							type="monotone"
							dataKey="Doug"
							stroke="var(--destructive)"
							strokeWidth={lineStrokeWidth}
							dot={getLineDot('var(--destructive)')}
							activeDot={{ r: lineActiveDotRadius }}
							name="Doug"
						/>
					)}
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
