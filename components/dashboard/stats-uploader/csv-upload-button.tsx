'use client'

import * as React from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsUploadDialog } from './stats-upload-dialog'

interface CsvUploadButtonProps {
	onSuccess?: () => void
}

export function CsvUploadButton({ onSuccess }: CsvUploadButtonProps) {
	const [open, setOpen] = React.useState(false)

	return (
		<>
			<Button
				variant="outline"
				className="h-9 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-all"
				onClick={() => setOpen(true)}
			>
				<Upload className="mr-2 h-4 w-4" />
				Upload CSV
			</Button>
			<StatsUploadDialog
				mode="csv"
				open={open}
				onOpenChange={setOpen}
				onSuccess={() => {
					onSuccess?.()
				}}
			/>
		</>
	)
}
