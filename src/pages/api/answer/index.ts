import { IUserAnswer } from "@/interface";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/index";

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
      return addNewAnswer(req, res);

    default:
      return res.status(404).json({ message: "Bad Request" });
  }
}

async function addNewAnswer(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { answer, id } = req.body;
  console.log(req.body);
  await prisma.$connect();
  const respuesta = await prisma.respuestas.create({
    data: {
      Respuesta: answer,
      Id_Pregunta: id,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json({ message: "Hola mundo" });
}
