'use client'

import * as React from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlayerTabContent } from '@/components/dashboard/player-tab-content'
import { getStatsFromFirestore } from '@/lib/data-fetching/firestore-stats'
import { DatePicker } from '@/components/dashboard/date-picker'
import { ModeToggle } from '@/components/mode-toggle'
import { StatSnapshot } from '@/types/dashboard'
import { Loader2 } from 'lucide-react'

export default function DashboardPage() {
	const [date, setDate] = React.useState<Date | undefined>(
		new Date(2025, 11, 27),
	)
	const [stats, setStats] = React.useState<StatSnapshot | null>(null)
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		async function fetchData() {
			setLoading(true)
			try {
				const data = await getStatsFromFirestore(date)
				setStats(data)
			} catch (error) {
				console.error('Failed to fetch stats:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [date])

	return (
		<div className="flex-1 space-y-4 p-8 pt-6 min-h-screen bg-background">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight hidden">Dashboard</h2>
			</div>
			<Tabs defaultValue="overview" className="space-y-4">
				<div className="sticky top-0 z-50 flex items-center justify-between bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-4 -mx-4 px-4">
					<TabsList className="bg-background border">
						<TabsTrigger value="overview">All</TabsTrigger>
						<TabsTrigger value="shaq">Shaq</TabsTrigger>
						<TabsTrigger value="josh">Josh</TabsTrigger>
						<TabsTrigger value="doug">Doug</TabsTrigger>
						<TabsTrigger value="mike">Mike</TabsTrigger>
						<TabsTrigger value="mir">Mir</TabsTrigger>
					</TabsList>

					<div className="flex items-center space-x-2">
						<ModeToggle />
						<DatePicker date={date} onSelect={setDate} />

						<Button className="h-9 bg-primary text-primary-foreground">
							<Download className="mr-2 h-4 w-4" />
							Export
						</Button>
					</div>
				</div>

				{loading ? (
					<div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-lg">
						<Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
						<p className="text-muted-foreground">Loading stats...</p>
					</div>
				) : stats ? (
					<>
						<PlayerTabContent
							value="overview"
							selectedPlayer="all"
							isOverview
							data={stats.games}
						/>
						<PlayerTabContent
							value="shaq"
							selectedPlayer="Shaq"
							playerName="Shaq"
							data={stats.games}
						/>
						<PlayerTabContent
							value="josh"
							selectedPlayer="Josh"
							playerName="Josh"
							data={stats.games}
						/>
						<PlayerTabContent
							value="doug"
							selectedPlayer="Doug"
							playerName="Doug"
							data={stats.games}
						/>
						<PlayerTabContent
							value="mike"
							selectedPlayer="Mike"
							playerName="Mike"
							data={stats.games}
						/>
						<PlayerTabContent
							value="mir"
							selectedPlayer="Mir"
							playerName="Mir"
							data={stats.games}
						/>
					</>
				) : (
					<div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-lg">
						<p className="text-muted-foreground">
							No stats available for this date.
						</p>
					</div>
				)}
			</Tabs>
		</div>
	)
}
