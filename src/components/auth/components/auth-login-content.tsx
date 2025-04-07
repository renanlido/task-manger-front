import { CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AuthCardContent } from "./auth-card-content";
import { AuthCardFooter } from "./auth-card-footer";

export const AuthLoginContent = () => {
	const { login } = useAuth();

	const loginSchema = z.object({
		email: z
			.string({
				required_error: "Email é obrigatório",
			})
			.email({
				message: "Email inválido",
			}),
		password: z
			.string({
				required_error: "Senha é obrigatória",
			})
			.min(8, "Senha deve conter pelo menos 8 caracteres")
			.max(20, "Senha deve conter no máximo 20 caracteres"),
	});

	const methods = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
		console.log(data);
		methods.reset();
		toast.success("Login realizado com sucesso");

		login(data.email, data.password);
	};

	return (
		<div>
			<Form {...methods}>
				<form onSubmit={methods.handleSubmit(handleLoginSubmit)}>
					<AuthCardContent className="space-y-4 p-4 pt-4">
						<FormField
							control={methods.control}
							name="email"
							render={({ field, formState }) => (
								<div className="space-y-2">
									<Label htmlFor="email" className="text-sm font-medium">
										Email
									</Label>
									<Input
										id="email"
										type="email"
										placeholder="seu@email.com"
										disabled={formState.isLoading}
										{...field}
									/>
									<FormMessage />
								</div>
							)}
						/>

						<FormField
							control={methods.control}
							name="password"
							render={({ field, formState }) => (
								<div className="space-y-2">
									<Label htmlFor="password" className="text-sm font-medium">
										Senha
									</Label>
									<Input
										id="password"
										type="password"
										placeholder="Sua senha"
										{...field}
										disabled={formState.isLoading}
									/>
									<FormMessage />
								</div>
							)}
						/>
					</AuthCardContent>
					<CardFooter>
						<AuthCardFooter isLoading={methods.formState.isLoading}>
							{methods.formState.isSubmitting ? "Entrando..." : "Entrar"}
						</AuthCardFooter>
					</CardFooter>
				</form>
			</Form>

			<div className="flex items-center justify-center gap-2">
				<Checkbox id="remember" />
				<Label htmlFor="remember">Lembrar-me</Label>
			</div>
		</div>
	);
};
