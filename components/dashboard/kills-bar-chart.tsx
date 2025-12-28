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
	LabelList,
} from 'recharts'
import { StatsPerGameBarChartProps } from '@/types/dashboard'
import { getCumulativeKills } from '@/lib/data-manipulation/kill-sums-over-time'

type KillsBarChartProps = StatsPerGameBarChartProps & {
	cumulative?: boolean
}

export function KillsBarChart({
	selectedPlayer = 'all',
	cumulative = false,
	data: providedData = [],
}: KillsBarChartProps) {
	const data = cumulative ? getCumulativeKills(providedData) : providedData
	const showAll = selectedPlayer === 'all'

	// Chart Title & Description
	const chartTitle = showAll ? 'Game Stats' : `${selectedPlayer}'s Game Stats`

	let chartDescription = ''
	if (cumulative) {
		chartDescription = showAll
			? `Cumulative Kills Per Player.`
			: `Cumulative Kills For ${selectedPlayer}.`
	} else {
		chartDescription = showAll
			? `Kills Per Player.`
			: `Kills For ${selectedPlayer}.`
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
				<BarChart
					data={data}
					margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
						stroke="var(--border)"
					/>
					<XAxis
						dataKey="game"
						stroke="var(--muted-foreground)"
						fontSize={12}
						tickLine={false}
						axisLine={false}
						tickMargin={10}
						tickFormatter={(value) => `G${value}`}
					/>
					<YAxis
						stroke="var(--muted-foreground)"
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
						>
							<LabelList
								dataKey="Shaq"
								position="top"
								fill="var(--muted-foreground)"
								fontSize={10}
								offset={4}
							/>
						</Bar>
					)}
					{(showAll || selectedPlayer === 'Josh') && (
						<Bar
							dataKey="Josh"
							fill="var(--chart-2)"
							radius={[4, 4, 0, 0]}
							name="Josh"
						>
							<LabelList
								dataKey="Josh"
								position="top"
								fill="var(--muted-foreground)"
								fontSize={10}
								offset={4}
							/>
						</Bar>
					)}
					{(showAll || selectedPlayer === 'Mike') && (
						<Bar
							dataKey="Mike"
							fill="var(--chart-3)"
							radius={[4, 4, 0, 0]}
							name="Mike"
						>
							<LabelList
								dataKey="Mike"
								position="top"
								fill="var(--muted-foreground)"
								fontSize={10}
								offset={4}
							/>
						</Bar>
					)}
					{(showAll || selectedPlayer === 'Doug') && (
						<Bar
							dataKey="Doug"
							fill="var(--destructive)"
							radius={[4, 4, 0, 0]}
							name="Doug"
						>
							<LabelList
								dataKey="Doug"
								position="top"
								fill="var(--muted-foreground)"
								fontSize={10}
								offset={4}
							/>
						</Bar>
					)}
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}
