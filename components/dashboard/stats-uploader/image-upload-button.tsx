'use client'

import * as React from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsUploadDialog } from './stats-upload-dialog'

interface ImageUploadButtonProps {
	onSuccess?: () => void
}

export function ImageUploadButton({ onSuccess }: ImageUploadButtonProps) {
	const [open, setOpen] = React.useState(false)

	return (
		<>
			<Button
				variant="outline"
				className="h-9 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-all"
				onClick={() => setOpen(true)}
			>
				<ImageIcon className="mr-2 h-4 w-4" />
				Upload Image
			</Button>
			<StatsUploadDialog
				mode="image"
				open={open}
				onOpenChange={setOpen}
				onSuccess={() => {
					onSuccess?.()
				}}
			/>
		</>
	)
}
