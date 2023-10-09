import { IQuestion } from "@/interface";
import { prisma } from "./index";

// export const getIdQuestion = async () => {
// 	await prisma.$connect();
// 	const id = await prisma.questions.count();
// 	await prisma.$disconnect;

// 	return id;
// };

export const qetAllQuestions = async () => {
  await prisma.$connect();
  const questions: IQuestion[] = await prisma.quest.findMany();
  await prisma.$disconnect;
  return questions;
};

export const getQuestion = async (id: string) => {
  await prisma.$connect();
  const question: IQuestion[] = await prisma.quest.findMany({
    where: {
      id,
    },
  });
  return question;
};
