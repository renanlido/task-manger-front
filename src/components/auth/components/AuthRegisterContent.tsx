import { CardFooter } from "@/components/ui/card";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthCardContent } from "./AuthCardContent";
import { AuthCardFooter } from "./AuthCardFooter";

export const AuthRegisterContent = () => {
	const { register } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from || { pathname: "/tasks" };
	const registerSchema = z
		.object({
			name: z
				.string({
					required_error: "Nome é obrigatório",
				})
				.min(3, "Nome deve conter pelo menos 3 caracteres"),
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
				.max(20, "Senha deve conter no máximo 20 caracteres")
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					"Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo",
				),
			confirmPassword: z
				.string({
					required_error: "Confirmar senha é obrigatório",
				})
				.min(8, "Senha deve conter pelo menos 8 caracteres"),
		})
		.superRefine((data, ctx) => {
			if (data.password !== data.confirmPassword) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "As senhas não coincidem",
					path: ["confirmPassword"],
				});

				return z.NEVER;
			}
		});

	const methods = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handleRegisterSubmit = async (data: z.infer<typeof registerSchema>) => {
		const response = await register(data.name, data.email, data.password);

		if (response.success) {
			methods.reset();
			navigate(from, { replace: true });
		}
	};
	return (
		<Form {...methods}>
			<form onSubmit={methods.handleSubmit(handleRegisterSubmit)}>
				<AuthCardContent className="space-y-4 p-4 pt-4">
					<FormField
						control={methods.control}
						name="name"
						render={({ field, formState }) => (
							<div className="space-y-2">
								<FormLabel htmlFor="name" className="text-sm font-medium">
									Nome
								</FormLabel>
								<Input
									type="text"
									id="name"
									data-testid="register-name"
									className="register-name-input"
									placeholder="Seu nome"
									disabled={formState.isSubmitting}
									{...field}
								/>
								<FormMessage />
							</div>
						)}
					/>

					<FormField
						control={methods.control}
						name="email"
						render={({ field, formState }) => (
							<div className="space-y-2">
								<FormLabel htmlFor="email" className="text-sm font-medium">
									Email
								</FormLabel>
								<Input
									type="email"
									id="email"
									data-testid="register-email"
									className="register-email-input"
									placeholder="seu@email.com"
									disabled={formState.isSubmitting}
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
								<FormLabel htmlFor="password" className="text-sm font-medium">
									Senha
								</FormLabel>
								<Input
									type="password"
									placeholder="Sua senha"
									id="password"
									data-testid="register-password"
									className="register-password-input"
									disabled={formState.isSubmitting}
									{...field}
								/>
								<FormMessage />
							</div>
						)}
					/>

					<FormField
						control={methods.control}
						name="confirmPassword"
						render={({ field, formState }) => (
							<div className="space-y-2">
								<FormLabel
									htmlFor="confirm-password"
									className="text-sm font-medium"
								>
									Confirmar Senha
								</FormLabel>
								<Input
									type="password"
									placeholder="Confirme sua senha"
									disabled={formState.isSubmitting}
									id="confirm-password"
									data-testid="register-confirm-password"
									className="register-confirm-password-input"
									{...field}
								/>
								<FormMessage />
							</div>
						)}
					/>
				</AuthCardContent>
				<CardFooter>
					<AuthCardFooter isLoading={methods.formState.isLoading}>
						{methods.formState.isSubmitting ? "Criando..." : "Criar conta"}
					</AuthCardFooter>
				</CardFooter>
			</form>
		</Form>
	);
};
