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
import { RevenueChart } from '@/components/dashboard/kills-per-game-chart'
import { TopProductsTable } from '@/components/dashboard/kills-per-game-table'
import { GameBarChart } from '@/components/dashboard/game-bar-chart'
import { TabsContent } from '@/components/ui/tabs'

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
					<CardHeader>
						<CardTitle>
							Combat History {isOverview ? '(Cumulative)' : ''}
						</CardTitle>
						<CardDescription>
							{isOverview
								? 'Race To 100 Kills Across All Games.'
								: `Overview Of Combat Performance Over Time For ${playerName}.`}
						</CardDescription>
					</CardHeader>
					<CardContent className="pl-2">
						<RevenueChart selectedPlayer={selectedPlayer} />
					</CardContent>
				</Card>

				<Card className="col-span-4 lg:col-span-7">
					<CardHeader>
						<CardTitle>Game Performance</CardTitle>
						{isOverview && (
							<CardDescription>
								Individual Game Kill Distribution.
							</CardDescription>
						)}
					</CardHeader>
					<CardContent className="pl-2">
						<GameBarChart selectedPlayer={selectedPlayer} />
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4 lg:col-span-7">
					<CardHeader>
						<CardTitle>Top Weapons</CardTitle>
					</CardHeader>
					<CardContent>
						<TopProductsTable selectedPlayer={selectedPlayer} />
					</CardContent>
				</Card>
			</div>
		</TabsContent>
	)
}
