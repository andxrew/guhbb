import { Avatar, AvatarImage } from "./ui/avatar"

export const BotAvatar = () => {
	return (
		<Avatar className="h-10 w-10">
			<AvatarImage
				className="h-10 w-10"
				src="/images/infinity_logo.png"
			/>
		</Avatar>
	)
}
