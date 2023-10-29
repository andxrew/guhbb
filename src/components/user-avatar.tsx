import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const UserAvatar = () => {
	return (
		<Avatar className="h-10 w-10">
			<AvatarImage src={"/images/user.png"} />
		</Avatar>
	)
}
