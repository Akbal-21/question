import Link from "next/link";

export const Navbar = () => {
	return (
		<div className="navbar">
			<div className="navbar-start">Servicio Social</div>
			<div className="navbar-center">
				<Link href="/ques" passHref>
					Hacer pregunta
				</Link>
			</div>
			<div className="navbar-end">
				<Link href="/answers" passHref>
					Responder Pregunt
				</Link>
			</div>
		</div>
	);
};
