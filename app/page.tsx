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
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { TopProductsTable } from '@/components/dashboard/top-products-table'

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
						<TabsTrigger value="randy">Randy</TabsTrigger>
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
								<CardTitle>Combat History</CardTitle>
								<CardDescription>
									Overview Of Combat Performance Over Time.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart />
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

				<TabsContent value="shaq" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Revenue</CardTitle>
								<CardDescription>
									Overview Of Revenue Over Time For Shaq.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart />
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

				<TabsContent value="josh" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Revenue</CardTitle>
								<CardDescription>
									Overview Of Revenue Over Time For Josh.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart />
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

				<TabsContent value="randy" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Revenue</CardTitle>
								<CardDescription>
									Overview Of Revenue Over Time For Randy.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart />
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

				<TabsContent value="mike" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Revenue</CardTitle>
								<CardDescription>
									Overview Of Revenue Over Time For Mike.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart />
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Top Product</CardTitle>
							</CardHeader>
							<CardContent>
								<TopProductsTable />
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="mir" className="space-y-4">
					<MetricsCards />
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Revenue</CardTitle>
								<CardDescription>
									Overview Of Revenue Over Time For Mir.
								</CardDescription>
							</CardHeader>
							<CardContent className="pl-2">
								<RevenueChart />
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 lg:col-span-7">
							<CardHeader>
								<CardTitle>Top Product</CardTitle>
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
