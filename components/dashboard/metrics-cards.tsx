'use client'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Crosshair, Skull, HeartPulse, Target } from 'lucide-react'
import {
	Bar,
	BarChart,
	Line,
	LineChart,
	ResponsiveContainer,
	Area,
	AreaChart,
	PieChart,
	Pie,
	Cell,
} from 'recharts'
import { GameData } from '@/types/dashboard'

const killsData = [
	{ name: 'M1', value: 40 },
	{ name: 'M2', value: 30 },
	{ name: 'M3', value: 50 },
	{ name: 'M4', value: 20 },
	{ name: 'M5', value: 68 },
	{ name: 'M6', value: 49 },
]

const deathsData = [
	{ name: 'M1', value: 10 },
	{ name: 'M2', value: 15 },
	{ name: 'M3', value: 8 },
	{ name: 'M4', value: 25 },
	{ name: 'M5', value: 12 },
	{ name: 'M6', value: 20 },
]

const assistsData = [
	{ name: 'Assists', value: 45 },
	{ name: 'Solo', value: 55 },
]

const damageData = [
	{ name: 'A', value: 4000 },
	{ name: 'B', value: 3000 },
	{ name: 'C', value: 2000 },
	{ name: 'D', value: 2780 },
	{ name: 'E', value: 1890 },
	{ name: 'F', value: 2390 },
	{ name: 'G', value: 3490 },
]

interface MetricsCardsProps {
	data?: GameData[]
}

export function MetricsCards({ data = [] }: MetricsCardsProps) {
	// For now, we are just passing the data prop to suppress the lint error.
	// In the future, this component can use the 'data' prop to show real-time metrics.
	console.log('MetricsCards received data for', data.length, 'games')
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{/* Kills - Blue */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						Total Kills <Crosshair className="h-4 w-4" />
					</CardTitle>
					<div className="text-xs font-medium bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300">
						+5%
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between mt-2">
						<div>
							<div className="text-2xl font-bold">1,245</div>
							<p className="text-xs text-muted-foreground mt-1">
								Relative to last week
							</p>
						</div>
						<div className="h-[60px] w-[80px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={killsData}>
									<Bar
										dataKey="value"
										fill="var(--chart-1)"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</CardContent>
				<CardFooter className="pt-0">
					<Button
						variant="ghost"
						className="w-full justify-between px-0 hover:bg-transparent hover:underline text-muted-foreground h-auto"
					>
						Inspect <ArrowRight className="h-4 w-4 ml-2" />
					</Button>
				</CardFooter>
			</Card>

			{/* Deaths - Teal */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						Deaths <Skull className="h-4 w-4" />
					</CardTitle>
					<div className="text-xs font-medium bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full dark:bg-rose-900 dark:text-rose-300">
						+2%
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between mt-2">
						<div>
							<div className="text-2xl font-bold">843</div>
							<p className="text-xs text-muted-foreground mt-1">
								Relative to last week
							</p>
						</div>
						<div className="h-[60px] w-[80px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={deathsData}>
									<Line
										type="monotone"
										dataKey="value"
										stroke="var(--chart-2)"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</CardContent>
				<CardFooter className="pt-0">
					<Button
						variant="ghost"
						className="w-full justify-between px-0 hover:bg-transparent hover:underline text-muted-foreground h-auto"
					>
						Inspect <ArrowRight className="h-4 w-4 ml-2" />
					</Button>
				</CardFooter>
			</Card>

			{/* Assists - Purple */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						Assists <HeartPulse className="h-4 w-4" />
					</CardTitle>
					<div className="text-xs font-medium bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300">
						+12%
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between mt-2">
						<div>
							<div className="text-2xl font-bold">342</div>
							<p className="text-xs text-muted-foreground mt-1">
								Relative to last week
							</p>
						</div>
						<div className="h-[60px] w-[60px]">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={assistsData}
										innerRadius={18}
										outerRadius={25}
										paddingAngle={0}
										dataKey="value"
										startAngle={90}
										endAngle={-270}
									>
										<Cell key="cell-0" fill="var(--background)" stroke="none" />
										<Cell key="cell-1" fill="var(--chart-3)" stroke="none" />
									</Pie>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>
				</CardContent>
				<CardFooter className="pt-0">
					<Button
						variant="ghost"
						className="w-full justify-between px-0 hover:bg-transparent hover:underline text-muted-foreground h-auto"
					>
						Inspect <ArrowRight className="h-4 w-4 ml-2" />
					</Button>
				</CardFooter>
			</Card>

			{/* Damage - Red/Mix */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						Avg Damage <Target className="h-4 w-4" />
					</CardTitle>
					<div className="text-xs font-medium bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300">
						+8%
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between mt-2">
						<div>
							<div className="text-2xl font-bold">2,450</div>
							<p className="text-xs text-muted-foreground mt-1">
								Relative to last week
							</p>
						</div>
						<div className="h-[60px] w-[80px]">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={damageData}>
									<defs>
										<linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset="5%"
												stopColor="var(--destructive)"
												stopOpacity={0.3}
											/>
											<stop
												offset="95%"
												stopColor="var(--destructive)"
												stopOpacity={0}
											/>
										</linearGradient>
									</defs>
									<Area
										type="monotone"
										dataKey="value"
										stroke="var(--destructive)"
										fillOpacity={1}
										fill="url(#colorVal)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</div>
				</CardContent>
				<CardFooter className="pt-0">
					<Button
						variant="ghost"
						className="w-full justify-between px-0 hover:bg-transparent hover:underline text-muted-foreground h-auto"
					>
						Inspect <ArrowRight className="h-4 w-4 ml-2" />
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
