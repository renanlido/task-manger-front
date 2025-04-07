import { Link } from "react-router-dom";

export default function NotFoundPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
			<h1 className="mb-4 text-6xl font-bold">404</h1>
			<h2 className="mb-6 text-2xl font-semibold">Página não encontrada</h2>
			<p className="mb-8 max-w-md text-gray-600">
				A página que você está procurando não existe ou foi movida.
			</p>
			<Link
				to="/"
				className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
			>
				Voltar para a página inicial
			</Link>
		</div>
	);
}
