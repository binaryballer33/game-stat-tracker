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
import { SumKillsPerGameLineChart } from '@/components/dashboard/sum-kills-per-game-line-chart'
import { KillsPerGameTable } from '@/components/dashboard/kills-per-game-table'
import { SumKillsPerGameBarChart } from '@/components/dashboard/sum-kills-per-game-bar-chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { KillsPerGameBarChart } from '@/components/dashboard/kills-per-game-bar-chart'

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
								<CardTitle>Combat Performance</CardTitle>
								<CardDescription>
									{isOverview
										? 'Race To 100 Kills Across All Games.'
										: `Detailed Combat Statistics Over Time For ${playerName}.`}
								</CardDescription>
							</div>
							<TabsList>
								<TabsTrigger value="bar">Bar Chart</TabsTrigger>
								<TabsTrigger value="line">Line Chart</TabsTrigger>
							</TabsList>
						</CardHeader>
						<CardContent className="pl-2">
							<TabsContent value="bar" className="m-0 border-none p-0">
								<SumKillsPerGameBarChart selectedPlayer={selectedPlayer} />
							</TabsContent>
							<TabsContent value="line" className="m-0 border-none p-0">
								<SumKillsPerGameLineChart selectedPlayer={selectedPlayer} />
							</TabsContent>
						</CardContent>
					</Tabs>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4 lg:col-span-7">
					<CardHeader>
						<CardTitle>Kills Bar Chart</CardTitle>
					</CardHeader>
					<CardContent>
						<KillsPerGameBarChart selectedPlayer={selectedPlayer} />
					</CardContent>
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
