import { IQuestion } from "../interface/question/index";
import { prisma } from "./index";

export const getIdQuestion = async () => {
	await prisma.$connect();
	const id = await prisma.questions.count();
	await prisma.$disconnect;

	return id;
};

export const qetAllQuestions = async () => {
	await prisma.$connect();
	const questions: IQuestion[] = await prisma.questions.findMany();
	await prisma.$disconnect;
	return questions;
};

export const getQuestion = async (id: number) => {
	await prisma.$connect();
	const question: IQuestion[] = await prisma.questions.findMany({
		where: {
			question_id: id,
		},
	});
	return question;
};
