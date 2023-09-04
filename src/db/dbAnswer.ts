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
		where: { question_id_fk: id },
	});
	await prisma.$disconnect();

	console.log(answer);
	return answer;
};
