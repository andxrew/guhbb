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
			"lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
			{
				input: {
					motion_module: "mm_sd_v14",
					prompt: " masterpiece, best quality" + prompt,
				},
			}
		)

		return NextResponse.json(response)
	} catch (error) {
		console.log("[VIDEO_ERROR]", error)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
