"use client"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
	MessageSquarePlus,
	ArrowRight,
	Headphones,
	FileImageIcon,
	Clapperboard,
	FileCode,
	Settings,
	Bot,
	Container,
	Aperture,
	MonitorPlay,
} from "lucide-react"

import { useRouter } from "next/navigation"

const tools = [
	{
		label: "ChatBot",
		icon: Bot,
		href: "/conversation",
		color: "text-green-500",
		bgColor: "bg-green-500/10",
	},

	{
		label: "CodeBot",
		icon: Container,
		href: "/code",
		color: "text-green-500",
		bgColor: "bg-green-500/10",
	},
	{
		label: "Image Generation",
		icon: Aperture,
		href: "/image",
		color: "text-orange-600",
		bgColor: "bg-orange-600/10",
	},
	{
		label: "Video generation",
		icon: MonitorPlay,
		href: "/video",
		color: "text-orange-600",
		bgColor: "bg-orange-600/10",
	},
	// {
	// 	label: "Music Generation",
	// 	icon: Headphones,
	// 	href: "/music",
	// 	color: "text-emerald-500",
	// 	bgColor: "bg-emerald-500/10",
	// },
]

const DashboardPage = () => {
	const router = useRouter()
	return (
		<div>
			<div className="mb-8 space-y-4">
				<h2 className="text-3xl md:text-4xl md:mt-8 font-bold text-center">
					Explore the Power of AI
				</h2>
				<p className="text-muted-foreground font-light text-sm md:text-lg text-center">
					Artificial Intelligence for a very real cause
				</p>
			</div>
			<div className="px-4 md:px-20 lg:px-32 space-y-4">
				{tools.map((tools) => (
					<Card
						onClick={() => router.push(tools.href)}
						key={tools.href}
						className="p-4 border-black-5 flex items-center justify-between hover:shadow-md
					transition cursor-pointer"
					>
						<div className="flex items-center gap-x-4">
							<div className={cn("p-2 w-fit rounded-md", tools.bgColor)}>
								<tools.icon className={cn("w-8 h-8", tools.color)} />
							</div>
							<div className="font-semibold">{tools.label}</div>
						</div>
						<ArrowRight className="w-5 h-5" />
					</Card>
				))}
			</div>
		</div>
	)
}

export default DashboardPage
