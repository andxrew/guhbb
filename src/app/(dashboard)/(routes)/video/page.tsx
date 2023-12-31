"use client"

import * as z from "zod"
import axios from "axios"
import { Clapperboard, MonitorPlay } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"

import { useRouter } from "next/navigation"

import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

import { formSchema } from "./constants"

import toast, { Toaster } from "react-hot-toast"
import { Badge } from "@/components/ui/badge"

const VideoPage = () => {
	const router = useRouter()

	const [treeCount, setTreeCount] = useState(0)
	const [video, setVideo] = useState<string>()
	const [requestCount, setRequestCount] = useState(0)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setRequestCount((prevCount) => prevCount + 1)
		try {
			setVideo(undefined)

			const response = await axios.post("/api/video", values)

			setVideo(response.data)
			form.reset()
		} catch (error: any) {
			if (error?.response?.status === 403) {
			} else {
				toast.error("Something went wrong")
			}
		} finally {
			router.refresh()
		}
	}

	useEffect(() => {
		if (requestCount > 0 && requestCount % 1 === 0) {
			// Plant a tree action when request count is a multiple of 10
			plantTree()
		}
	}, [requestCount]) // Run the effect whenever requestCount changes

	const plantTree = () => {
		// Implement tree planting logic here
		// For example: send a request to your tree planting API endpoint
		// axios.post("/api/plant-tree", { userId: userId });
		console.log("Tree planted!")

		// Increase the tree count by 1 when a tree is planted
		setTreeCount((prevCount) => prevCount + 1)

		// Display a toast notification when a tree is planted
		toast.success("Tree Planted! 🌳")
	}

	return (
		<div>
			<Toaster />
			<Heading
				title="GifBot"
				description="Gif, not Jif (Takes around 50 Seconds)"
				icon={MonitorPlay}
				iconColor="text-orange-600"
				bgColor="bg-orange-600/10"
			/>
			<div className="flex justify-between px-6 mb-2">
				<h1 className="text-muted-foreground text-xs items-center px-3">
					1 tree planted for each generation{" "}
				</h1>
				<Badge variant="green">Trees Planted: {treeCount}</Badge>
			</div>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid
                        grid-cols-12 gap-2"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0
                                            focus-visible:ring-transparent"
												disabled={isLoading}
												placeholder="Anime Ninja, 8K, High Resolution"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								disabled={isLoading}
								variant={"green"}
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}
					{!video && !isLoading && (
						<div>
							<Empty label="No Video generated - Say Something!" />
						</div>
					)}
					{video && (
						<video
							className="w-full aspect-video mt-8 rounded-lg border bg-black"
							controls
							loop
							autoPlay
						>
							<source src={video}></source>
						</video>
					)}
				</div>
			</div>
		</div>
	)
}

export default VideoPage
