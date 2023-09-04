import { LayoutPage } from "@/components/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
	return (
		<LayoutPage title="Servicio Social">
			<div className="p-11">Esto es la pagina de inicio de la palicacion</div>
		</LayoutPage>
	);
}
