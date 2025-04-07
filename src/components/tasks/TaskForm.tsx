import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTask } from "@/contexts/TaskContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormMessage } from "../ui/form";

export const TaskForm: React.FC = () => {
	const { addTask } = useTask();

	const formSchema = z.object({
		title: z.string().min(3, {
			message: "Título deve conter pelo menos 3 caracteres",
		}),
		description: z.string().optional(),
	});

	const methods = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data);

		addTask(data.title, data.description);
		methods.reset();
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Nova Tarefa</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...methods}>
					<form
						onSubmit={methods.handleSubmit(handleSubmit)}
						className="flex flex-col gap-4"
					>
						<div className="flex gap-2">
							<FormField
								control={methods.control}
								name="title"
								render={({ field, formState }) => (
									<div className="w-full space-y-2">
										<Input
											placeholder="O que você precisa fazer?"
											className="task-title-input flex-1"
											id="task-title"
											data-testid="task-title-input"
											aria-label="Título"
											disabled={formState.isSubmitting}
											{...field}
										/>
										<FormMessage data-testId="task-title-error" />
									</div>
								)}
							/>

							<Button
								type="submit"
								className="add-task-button cursor-pointer"
								data-testid="add-task-button"
								disabled={methods.formState.isSubmitting}
							>
								<Plus className="mr-2 h-4 w-4" />
								Adicionar Tarefa
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
