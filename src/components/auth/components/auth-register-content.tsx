import { CardFooter } from "@/components/ui/card";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthCardContent } from "./auth-card-content";
import { AuthCardFooter } from "./auth-card-footer";

export const AuthRegisterContent = () => {
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
		console.log(data);
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
