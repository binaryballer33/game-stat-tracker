'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Crosshair,
	Skull,
	HeartPulse,
	RefreshCw,
	LucideIcon,
} from 'lucide-react'

import { GameData } from '@/types/dashboard'

type MetricsCardsProps = {
	data?: GameData[]
}

const MetricCard = ({
	title,
	icon: Icon,
	winner,
	colorClass,
}: {
	title: string
	icon: LucideIcon
	winner: { name: string; total: number } | null
	colorClass: string
}) => (
	<Card>
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				{title} <Icon className="h-4 w-4" />
			</CardTitle>
		</CardHeader>
		<CardContent>
			{winner ? (
				<div className="flex items-baseline gap-2">
					<span className="text-2xl font-bold tracking-tight">
						{winner.name}
					</span>
					<span className={`text-2xl font-black ${colorClass}`}>
						{winner.total}
					</span>
				</div>
			) : (
				<span className="text-2xl font-bold text-muted-foreground/50 italic">
					N / A
				</span>
			)}
		</CardContent>
	</Card>
)

export function MetricsCards({ data = [] }: MetricsCardsProps) {
	const stats = React.useMemo(() => {
		const totals: Record<string, Record<string, number>> = {
			kills: {},
			deaths: {},
			assists: {},
			redeploys: {},
		}

		data.forEach((game) => {
			// Extract metrics from game object
			const deaths = game.deaths
			const assists = game.assists
			const redeploys = game.redeploys

			// Process kills (numeric keys at root that aren't 'game')
			Object.entries(game).forEach(([key, val]) => {
				if (
					key !== 'game' &&
					key !== 'deaths' &&
					key !== 'assists' &&
					key !== 'redeploys' &&
					typeof val === 'number'
				) {
					totals.kills[key] = (totals.kills[key] || 0) + val
				}
			})

			// Process nested metrics
			const processNested = (
				category: keyof typeof totals,
				record?: Record<string, number>,
			) => {
				if (!record) return
				Object.entries(record).forEach(([player, val]) => {
					totals[category][player] = (totals[category][player] || 0) + val
				})
			}

			processNested('deaths', deaths)
			processNested('assists', assists)
			processNested('redeploys', redeploys)
		})

		const getWinner = (category: keyof typeof totals) => {
			const categoryData = totals[category]
			let winner: string | null = null
			let max = 0

			Object.entries(categoryData).forEach(([player, value]) => {
				if (value > max) {
					max = value
					winner = player
				}
			})

			return winner ? { name: winner, total: max } : null
		}

		return {
			mostKills: getWinner('kills'),
			mostDeaths: getWinner('deaths'),
			mostAssists: getWinner('assists'),
			mostRedeploys: getWinner('redeploys'),
		}
	}, [data])

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<MetricCard
				title="Most Kills"
				icon={Crosshair}
				winner={stats.mostKills}
				colorClass="text-emerald-500"
			/>
			<MetricCard
				title="Most Deaths"
				icon={Skull}
				winner={stats.mostDeaths}
				colorClass="text-rose-500"
			/>
			<MetricCard
				title="Most Assists"
				icon={HeartPulse}
				winner={stats.mostAssists}
				colorClass="text-blue-500"
			/>
			<MetricCard
				title="Most Redeploys"
				icon={RefreshCw}
				winner={stats.mostRedeploys}
				colorClass="text-purple-500"
			/>
		</div>
	)
}
