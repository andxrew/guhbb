import { Avatar, AvatarImage } from "./ui/avatar"

export const BotAvatar = () => {
	return (
		<Avatar className="h-10 w-12">
			<AvatarImage
				className="h-10 w-12"
				src="/images/infinity_logo.png"
			/>
		</Avatar>
	)
}
