import Image from "next/image"

export const Loader = () => {
	return (
		<div className="h-full flex flex-col gap-y-4 items-center justify-center">
			<div className="w-12 h-10 relative animate-spin">
				<Image
					alt="logo"
					fill
					src={"/images/infinity_logo.png"}
				/>
			</div>
			<p className="text-sm text-muted-foreground">IT is Working...</p>
		</div>
	)
}
