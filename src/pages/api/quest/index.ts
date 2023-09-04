import { prisma } from "@/db";
import { IAnswer, IQuestion } from "@/interface";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case "POST":
			return addQuest(req, res);

		default:
			return res.status(404).json({ message: "Bad Request" });
	}
}

async function addQuest(req: NextApiRequest, res: NextApiResponse) {
	const { question, anss } = req.body;

	// rome-ignore lint/style/useConst: <explanation>
	let pregunta: IQuestion;
	const respuesta: IAnswer[] = [];
	await prisma.$connect();
	pregunta = await prisma.questions.create({
		data: question,
	});
	const { question_id } = pregunta;

	for (const key in anss) {
		const { answer, its_correct }: IAnswer = anss[key];
		const result = await prisma.answers.create({
			data: {
				answer,
				its_correct,
				question_id_fk: question_id,
			},
		});
		console.log(result);

		respuesta.push(result);
	}

	await prisma.$disconnect();

	return res.status(200).json({ pregunta, respuesta });
}
