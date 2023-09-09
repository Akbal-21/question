import { prisma } from "@/db";

export const getAllAnswers = async () => {
	await prisma.$connect();
	const answers = await prisma.answers.findMany();
	await prisma.$disconnect();

	return answers;
};

export const getAnswers = async (id: number) => {
	await prisma.$connect();
	const answer = await prisma.answers.findMany({
		where: { question_id_fk: id, its_correct: true },
	});
	await prisma.$disconnect();
	return answer;
};
