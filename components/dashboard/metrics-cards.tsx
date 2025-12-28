'use client'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Crosshair, Skull, HeartPulse } from 'lucide-react'

import { GameData } from '@/types/dashboard'

type MetricsCardsProps = {
	data?: GameData[]
}

export function MetricsCards({ data = [] }: MetricsCardsProps) {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						Most Kills <Crosshair className="h-4 w-4" />
					</CardTitle>
				</CardHeader>
				<CardContent>Test Data</CardContent>
				<CardFooter className="pt-0">Dummy Data</CardFooter>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						Most Deaths <Skull className="h-4 w-4" />
					</CardTitle>
				</CardHeader>
				<CardContent>Test Data</CardContent>
				<CardFooter className="pt-0">Dummy Data</CardFooter>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						Most Assists <HeartPulse className="h-4 w-4" />
					</CardTitle>
				</CardHeader>
				<CardContent>Test Data</CardContent>
				<CardFooter className="pt-0">Dummy Data</CardFooter>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
						Most Redeploys <HeartPulse className="h-4 w-4" />
					</CardTitle>
				</CardHeader>
				<CardContent>Test Data</CardContent>
				<CardFooter className="pt-0">Dummy Data</CardFooter>
			</Card>
		</div>
	)
}
