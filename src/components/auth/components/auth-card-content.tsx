import { CardContent } from "@/components/ui/card";

type AuthCardContentProps = {
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const AuthCardContent = ({
	children,
	...rest
}: AuthCardContentProps) => {
	return (
		<CardContent className="space-y-4 p-4 pt-4" {...rest}>
			{children}
		</CardContent>
	);
};
