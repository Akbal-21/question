import { prisma } from "@/db";
import { IUserAnswer } from "@/interface";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| { result: IUserAnswer };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case "POST":
			return addUserAnswers(req, res);

		default:
			return res.status(404).json({ message: "Bad Request" });
	}
}

async function addUserAnswers(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { question_id, answer, its_correct } = req.body;
	await prisma.$connect();
	const tried = await prisma.user_Answer.count({
		where: {
			question_id_fk: question_id,
		},
	});
	const intento: number = tried + 1;

	const result: IUserAnswer = await prisma.user_Answer.create({
		data: {
			anser: answer,
			its_correct,
			question_id_fk: question_id,
			intento,
		},
	});

	await prisma.$disconnect();

	return res.status(200).json({ result });
}
