"use client"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Sidebar from "./sidebar"

interface MobileSidebarProps {}

const MobileSidebar = ({}: MobileSidebarProps) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<Sheet>
			<SheetTrigger>
				<Button
					variant={"ghost"}
					size={"icon"}
					className="md:hidden"
				>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent
				side={"top"}
				className="p-0"
			>
				<Sidebar />
			</SheetContent>
		</Sheet>
	)
}

export default MobileSidebar
