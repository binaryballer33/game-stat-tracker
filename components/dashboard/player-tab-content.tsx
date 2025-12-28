'use client'

import * as React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { MetricsCards } from '@/components/dashboard/metrics-cards'
import { KillsLineChart } from '@/components/dashboard/kills-line-chart'
import { KillsBarChart } from '@/components/dashboard/kills-bar-chart'
import { KillsPerGameTable } from '@/components/dashboard/kills-per-game-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PlayerTabContentProps {
	value: string
	selectedPlayer: 'Doug' | 'Josh' | 'Mike' | 'Shaq' | 'all'
	playerName?: string
	isOverview?: boolean
}

export function PlayerTabContent({
	value,
	selectedPlayer,
	playerName,
	isOverview = false,
}: PlayerTabContentProps) {
	return (
		<TabsContent value={value} className="space-y-4">
			<MetricsCards />
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4 lg:col-span-7">
					<Tabs defaultValue="bar" className="w-full">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<div className="space-y-1">
								<CardTitle>Game Performance</CardTitle>
								<CardDescription>
									{isOverview
										? 'Detailed Game-By-Game Statistics'
										: `Statistics Over Time For ${playerName}.`}
								</CardDescription>
							</div>
							<TabsList>
								<TabsTrigger value="bar">Bar Chart</TabsTrigger>
								<TabsTrigger value="line">Line Chart</TabsTrigger>
							</TabsList>
						</CardHeader>
						<CardContent>
							<TabsContent value="bar" className="m-0 border-none p-0">
								<KillsBarChart
									selectedPlayer={selectedPlayer}
									cumulative={true}
								/>
							</TabsContent>
							<TabsContent value="line" className="m-0 border-none p-0">
								<KillsLineChart
									selectedPlayer={selectedPlayer}
									cumulative={true}
								/>
							</TabsContent>
						</CardContent>
					</Tabs>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4 lg:col-span-7">
					<Tabs defaultValue="bar" className="w-full">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<div className="space-y-1">
								<CardTitle>Game Performance</CardTitle>
								<CardDescription>
									{isOverview
										? 'Detailed Game-By-Game Statistics'
										: `Statistics Over Time For ${playerName}.`}
								</CardDescription>
							</div>
							<TabsList>
								<TabsTrigger value="bar">Bar Chart</TabsTrigger>
								<TabsTrigger value="line">Line Chart</TabsTrigger>
							</TabsList>
						</CardHeader>
						<CardContent>
							<TabsContent value="bar" className="m-0 border-none p-0">
								<KillsBarChart
									selectedPlayer={selectedPlayer}
									cumulative={false}
								/>
							</TabsContent>
							<TabsContent value="line" className="m-0 border-none p-0">
								<KillsLineChart
									selectedPlayer={selectedPlayer}
									cumulative={false}
								/>
							</TabsContent>
						</CardContent>
					</Tabs>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4 lg:col-span-7">
					<CardHeader>
						<CardTitle>Kills Table</CardTitle>
					</CardHeader>
					<CardContent>
						<KillsPerGameTable selectedPlayer={selectedPlayer} />
					</CardContent>
				</Card>
			</div>
		</TabsContent>
	)
}
