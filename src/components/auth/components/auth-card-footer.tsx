import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type AuthCardFooterProps = {
	isLoading: boolean;
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const AuthCardFooter = ({
	isLoading,
	children,
	className,
	...props
}: AuthCardFooterProps) => {
	return (
		<div className={cn("flex justify-center p-0 py-4", className)} {...props}>
			<Button
				type="submit"
				className="w-full cursor-pointer"
				disabled={isLoading}
			>
				{children}
			</Button>
		</div>
	);
};
