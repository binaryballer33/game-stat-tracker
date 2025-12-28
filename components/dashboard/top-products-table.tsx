'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

const weapons = [
	{
		id: 'w1',
		name: 'M4A1 Assault Rifle',
		type: 'Assault Rifle',
		kills: '1,245',
		headshots: '30%',
		accuracy: '42%',
		damage: '450k',
		color: 'bg-blue-500',
	},
	{
		id: 'w2',
		name: 'MP5 Submachine Gun',
		type: 'SMG',
		kills: '890',
		headshots: '25%',
		accuracy: '38%',
		damage: '280k',
		color: 'bg-gray-800',
	},
	{
		id: 'w3',
		name: 'Sniper Rifle .50',
		type: 'Sniper',
		kills: '450',
		headshots: '85%',
		accuracy: '92%',
		damage: '150k',
		color: 'bg-orange-500',
	},
]

export function TopProductsTable() {
	return (
		<div className="w-full">
			<div className="flex items-center justify-between mb-4">
				{/* Header is handled by parent CardHeader */}
				<div className="text-sm font-medium text-destructive">
					See all weapons &gt;
				</div>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[180px]">Weapon</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Kills</TableHead>
						<TableHead>Headshots</TableHead>
						<TableHead>Accuracy</TableHead>
						<TableHead className="text-right">Damage</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{weapons.map((weapon) => (
						<TableRow key={weapon.id}>
							<TableCell className="font-medium flex items-center gap-2">
								<div
									className={`w-8 h-8 rounded-md ${weapon.color} opacity-80`}
								/>
								{weapon.name}
							</TableCell>
							<TableCell>{weapon.type}</TableCell>
							<TableCell>{weapon.kills}</TableCell>
							<TableCell>{weapon.headshots}</TableCell>
							<TableCell>{weapon.accuracy}</TableCell>
							<TableCell className="text-right">{weapon.damage}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
