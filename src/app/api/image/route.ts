import { NextResponse } from "next/server"
import Replicate from "replicate"

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { prompt } = body

		if (!prompt) {
			return new NextResponse("Prompt are required", { status: 400 })
		}

		const response = await replicate.run(
			"luosiallen/latent-consistency-model:553803fd018b3cf875a8bc774c99da9b33f36647badfd88a6eec90d61c5f62fc",
			{
				input: {
					prompt: prompt,
				},
			}
		)

		return NextResponse.json(response)
	} catch (error) {
		console.log("[MUSIC_ERROR]", error)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
