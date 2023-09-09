import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
};

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const bod = req.body;
	console.log(bod);
	// Permite solicitudes desde cualquier origen
	// res.setHeader("Access-Control-Allow-Origin", "*");
	//
	// Configura otros encabezados CORS según sea necesario
	// res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	// res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	// const data = await fetch("http://localhost:8000/", {
	// method: "POST",
	// body: JSON.stringify(bod),
	// headers: {
	// "Content-Type": "application/json",
	// "Access-Control-Allow-Origin": "*",
	// "Access-Control-Allow-Methods": "POST",
	// "Access-Control-Allow-Headers": "Content-Type, Authorization",
	// },
	// }).then((res) => res.json);
	// console.log({ data });

	res.status(200).json({ message: "Example" });
}
