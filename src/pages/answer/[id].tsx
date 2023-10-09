import { LayoutPage } from "@/components/Layout";
import { getQuestion } from "@/db/dbQuestion";
import { NextPage } from "next";

interface Props {
  id: string;
  name_quest: string;
  quest: string;
}

const Answers = dynamic(() => import("../../components/Answers"), {
  loading: () => <p>Cargando...</p>, // Puedes personalizar el mensaje de carga
  ssr: false, // Esto asegura que se cargue solo en el lado del cliente
});

const AnswerPage: NextPage<Props> = ({ id, name_quest, quest }) => {
  const handleAnswer = async () => {
    return;
  };

  return (
    <LayoutPage title="Responde la pregunta">
      <div className=" m-40">
        <Answers id={id} name_quest={name_quest} quest={quest} />
      </div>
    </LayoutPage>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id = "" } = params as { id: string };
  console.log(id);

  const pregunta = await getQuestion(id); // your fetch function here

  const { name_quest, quest } = pregunta[0];
  return {
    props: {
      id,
      name_quest,
      quest,
    },
  };
};

export default AnswerPage;

//if (!questions[0].question_id) {
//	return <h3>No se pueden cargar los datos</h3>;
//}
