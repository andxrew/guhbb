"use client"

import * as z from "zod"
import axios from "axios"
import Image from "next/image"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Download, Aperture } from "lucide-react"
import { useForm } from "react-hook-form"

import { useRouter } from "next/navigation"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Loader } from "@/components/loader"
import { Empty } from "@/components/empty"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { amountOptions, formSchema, resolutionOptions } from "./constants"

import { Toaster, toast } from "react-hot-toast"
import { Badge } from "@/components/ui/badge"

const ImagePage = () => {
	const router = useRouter()

	const [treeCount, setTreeCount] = useState(0)
	const [photos, setPhotos] = useState<string[]>([])
	const [requestCount, setRequestCount] = useState(0)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
			amount: "1",
			resolution: "512x512",
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setRequestCount((prevCount) => prevCount + 1)
		try {
			setPhotos([])

			const response = await axios.post("/api/image", values)
			console.log(response.data)

			// const urls = response.data.map((image: { url: string }) => image.url)
			const urls = response.data.map((image: { url: string }) => image)

			setPhotos(urls)
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
		if (requestCount > 0 && requestCount % 5 === 0) {
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
				title="PhotoBot"
				description="Prompts = Power, simple as that"
				icon={Aperture}
				iconColor="text-orange-600"
				bgColor="bg-orange-600/10"
			/>
			<div className="flex justify-between px-6 mb-2">
				<h1 className="text-muted-foreground text-xs items-align">
					1 tree planted for each 5 generations{" "}
				</h1>
				<Badge variant="green">Trees Planted: {treeCount}</Badge>
			</div>
			<div className="px-4 lg:px-8">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
					>
						<FormField
							name="prompt"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-6">
									<FormControl className="m-0 p-0">
										<Input
											className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											disabled={isLoading}
											placeholder="The Moon (Trust me)"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						{/* <FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-2">
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{amountOptions.map((option) => (
												<SelectItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/> */}
						{/* <FormField
							control={form.control}
							name="resolution"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-2">
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{resolutionOptions.map((option) => (
												<SelectItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/> */}
						<Button
							className="col-span-12 lg:col-span-2 w-full"
							type="submit"
							disabled={isLoading}
							variant={"green"}
							size="icon"
						>
							Generate
						</Button>
					</form>
				</Form>
				{isLoading && (
					<div className="p-20">
						<Loader />
					</div>
				)}
				{photos.length === 0 && !isLoading && (
					<Empty label="No images generated." />
				)}
				<div className="grid grid-cols-1  gap-4 mt-8">
					{photos.map((src, index) => (
						<Card
							key={index}
							className="rounded-lg overflow-hidden"
						>
							<div className="relative aspect-square">
								<Image
									fill
									alt="Generated"
									src={src}
								/>
							</div>
							<CardFooter className="p-2">
								<Button
									onClick={() => window.open(src)}
									variant="secondary"
									className="w-full"
								>
									<Download className="h-4 w-4 mr-2" />
									Download
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}

export default ImagePage

// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import Image from "next/image"

// const ImageDisplay = () => {
// 	const [images, setImages] = useState([])

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await axios.post("/api/image", {
// 					prompt: "volcano",
// 				}) // Replace 'your-prompt-here' with the actual prompt
// 				setImages(response.data) // Assuming the API response is an array of image URLs
// 			} catch (error) {
// 				console.error("Error fetching images:", error)
// 			}
// 		}

// 		fetchData() // Fetch images when the component mounts

// 		// Optionally, you can add a cleanup function for useEffect if needed
// 		// return () => {
// 		//   cleanup logic here
// 		// };
// 	}, []) // Empty dependency array ensures the effect runs once after the initial render

// 	return (
// 		<div className="container mx-auto p-4">
// 			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// 				{images.map((imageUrl, index) => (
// 					<div
// 						key={index}
// 						className="max-w-xs rounded overflow-hidden shadow-lg"
// 					>
// 						<Image
// 							src={imageUrl}
// 							alt={`Image ${index}`}
// 							fill
// 						/>
// 						<div className="px-6 py-4">
// 							{/* Additional details or metadata about the image can be displayed here */}
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	)
// }

// export default ImageDisplay
