// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case "GET":
			return addQuest(req, res);

		default:
			return res.status(404).json({ message: "Bad Request" });
	}
}

function addQuest(req: NextApiRequest, res: NextApiResponse<Data>) {
	const body = req.body;
	console.log(body);
}
