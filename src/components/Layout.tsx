import Head from "next/head";
import { FC } from "react";
import { Navbar } from "./ui/Navbar";

interface Props {
	title: string;
	children: JSX.Element | JSX.Element[];
}

export const LayoutPage: FC<Props> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<nav>
				<Navbar />
			</nav>

			<main>
				<div className=" flex justify-center items-center h-[calc(100vh - 200px)]">
					{children}
				</div>
			</main>
		</>
	);
};
