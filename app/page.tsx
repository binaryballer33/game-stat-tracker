import { Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlayerTabContent } from '@/components/dashboard/player-tab-content'

export default function DashboardPage() {
	return (
		<div className="flex-1 space-y-4 p-8 pt-6 min-h-screen bg-background">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight hidden">Dashboard</h2>
			</div>
			<Tabs defaultValue="overview" className="space-y-4">
				<div className="flex items-center justify-between">
					<TabsList className="bg-background border">
						<TabsTrigger value="overview">All</TabsTrigger>
						<TabsTrigger value="shaq">Shaq</TabsTrigger>
						<TabsTrigger value="josh">Josh</TabsTrigger>
						<TabsTrigger value="doug">Doug</TabsTrigger>
						<TabsTrigger value="mike">Mike</TabsTrigger>
						<TabsTrigger value="mir">Mir</TabsTrigger>
					</TabsList>

					<div className="flex items-center space-x-2">
						<Button variant="outline" className="h-9">
							<Filter className="mr-2 h-4 w-4" />
							Filter
						</Button>
						<Button className="h-9 bg-primary text-primary-foreground">
							<Download className="mr-2 h-4 w-4" />
							Export
						</Button>
					</div>
				</div>

				<PlayerTabContent value="overview" selectedPlayer="all" isOverview />
				<PlayerTabContent
					value="shaq"
					selectedPlayer="Shaq"
					playerName="Shaq"
				/>
				<PlayerTabContent
					value="josh"
					selectedPlayer="Josh"
					playerName="Josh"
				/>
				<PlayerTabContent
					value="doug"
					selectedPlayer="Doug"
					playerName="Doug"
				/>
				<PlayerTabContent
					value="mike"
					selectedPlayer="Mike"
					playerName="Mike"
				/>
				<PlayerTabContent value="mir" selectedPlayer="all" playerName="Mir" />
			</Tabs>
		</div>
	)
}
