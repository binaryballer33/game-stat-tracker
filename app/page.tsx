import { Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

				<TabsContent value="overview" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Combat History (Cumulative)</CardTitle>
								<CardDescription>
									Race To 100 Kills Across All Games.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart selectedPlayer="all" />
							</CardContent>
						</Card>

						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Game Performance</CardTitle>
								<CardDescription>
									Individual Game Kill Distribution.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<GameBarChart selectedPlayer="all" />
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Top Weapons</CardTitle>
							</CardHeader>
							<CardContent>
								<TopProductsTable selectedPlayer="all" />
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="shaq" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Combat History</CardTitle>
								<CardDescription>
									Overview Of Combat Performance Over Time For Shaq.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart selectedPlayer="Shaq" />
							</CardContent>
						</Card>

						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Game Performance</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<GameBarChart selectedPlayer="Shaq" />
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Top Weapons</CardTitle>
							</CardHeader>
							<CardContent>
								<TopProductsTable selectedPlayer="Shaq" />
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="josh" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Combat History</CardTitle>
								<CardDescription>
									Overview Of Combat Performance Over Time For Josh.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart selectedPlayer="Josh" />
							</CardContent>
						</Card>

						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Game Performance</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<GameBarChart selectedPlayer="Josh" />
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Top Weapons</CardTitle>
							</CardHeader>
							<CardContent>
								<TopProductsTable selectedPlayer="Josh" />
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="doug" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Combat History</CardTitle>
								<CardDescription>
									Overview Of Combat Performance Over Time For Doug.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart selectedPlayer="Doug" />
							</CardContent>
						</Card>

						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Game Performance</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<GameBarChart selectedPlayer="Doug" />
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Top Weapons</CardTitle>
							</CardHeader>
							<CardContent>
								<TopProductsTable selectedPlayer="Doug" />
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="mike" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Combat History</CardTitle>
								<CardDescription>
									Overview Of Combat Performance Over Time For Mike.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart selectedPlayer="Mike" />
							</CardContent>
						</Card>

						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Game Performance</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<GameBarChart selectedPlayer="Mike" />
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Top Weapons</CardTitle>
							</CardHeader>
							<CardContent>
								<TopProductsTable selectedPlayer="Mike" />
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="mir" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Combat History</CardTitle>
								<CardDescription>
									Overview Of Combat Performance Over Time For Mir.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								{/* Mir not in dummyData */}
								<RevenueChart />
							</CardContent>
						</Card>

						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Game Performance</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<GameBarChart />
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Top Weapons</CardTitle>
							</CardHeader>
							<CardContent>
								<TopProductsTable />
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
