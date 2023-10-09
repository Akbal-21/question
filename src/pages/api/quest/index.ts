import { PrismaClient } from "@prisma/client";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | {
      form: {
        id: string;
        name_quest: string;
        quest: string | null;
        quest_information: string | null;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "POST":
      return insertQuestion(req, res);

    default:
      return res.status(405).end();
  }
}
async function insertQuestion(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { nameQuestion, quest, questInformation } = req.body as {
    nameQuestion: string;
    quest: string;
    questInformation: string;
  };
  console.log({ nameQuestion, quest, questInformation });

  const prisma = new PrismaClient();

  await prisma.$connect();

  const form = await prisma.quest.create({
    data: {
      name_quest: nameQuestion,
      quest,
      quest_information: questInformation,
    },
  });

  await prisma.$disconnect();
  return res.status(200).json({ form });
}
