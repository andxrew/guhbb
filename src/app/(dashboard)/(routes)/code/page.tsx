"use client"

import * as z from "zod"
import axios from "axios"
import { Container, FileCode } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

import { useRouter } from "next/navigation"
import { ChatCompletionRequestMessage } from "openai"
import { zodResolver } from "@hookform/resolvers/zod"

import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { BotAvatar } from "@/components/bot-avatar"
import { UserAvatar } from "@/components/user-avatar"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { cn } from "@/lib/utils"

import { formSchema } from "./constants"
import { Toaster, toast } from "react-hot-toast"
import { Badge } from "@/components/ui/badge"

const CodePage = () => {
	const router = useRouter()

	const [treeCount, setTreeCount] = useState(0)
	const [requestCount, setRequestCount] = useState(0)
	const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setRequestCount((prevCount) => prevCount + 1)

			const userMessage: ChatCompletionRequestMessage = {
				role: "user",
				content: values.prompt,
			}
			const newMessages = [...messages, userMessage]

			const response = await axios.post("/api/code", {
				messages: newMessages,
			})
			setMessages((current) => [...current, userMessage, response.data])

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
		if (requestCount > 0 && requestCount % 10 === 0) {
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
				title="CodeBot"
				description="Generate code using prompts"
				icon={Container}
				iconColor="text-green-500"
				bgColor="bg-green-500/10"
			/>
			<div className="flex justify-between px-6 mb-2">
				<h1 className="text-muted-foreground text-xs items-align">
					1 tree planted for each 10 generations{" "}
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
												placeholder="Write the code for a simple button styled using tailwind css"
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
								Submit
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
					{messages.length === 0 && !isLoading && (
						<div>
							<Empty label="No Messages - Say Something!" />
						</div>
					)}
					<div className="flex flex-col gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									"p-8 w-full flex items-start gap-x-8 rounded-lg",
									message.role === "user"
										? "bg-white  bg-green-500/10"
										: "bg-muted"
								)}
							>
								{message.role === "user" ? <UserAvatar /> : <BotAvatar />}
								<ReactMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code
												className="bg-black/10 rounded-lg p-1"
												{...props}
											/>
										),
									}}
									className="text-sm overflow-hidden leading-7"
								>
									{message.content || ""}
								</ReactMarkdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CodePage
