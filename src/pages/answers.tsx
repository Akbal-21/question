import { LayoutPage } from "@/components/Layout";
import { qetAllQuestions } from "@/db/dbQuestion";
import { IQuestion } from "@/interface";

interface Props {
  questions: IQuestion[];
}

const AnswersPage: NextPage<Props> = ({ questions }) => {
  const route = useRouter();

  console.log(questions);

  const handlertesst = (id: string) => {
    if (!id) {
      return alert("No se puede carga la pagina");
    }
    route.replace(`/answer/${id}`);
  };

  return (
    <LayoutPage title="Responder pregunta">
      <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
        {questions.map((quest) => {
          return (
            <div className="p-4" key={quest.quest}>
              <div className="card">
                <div className="card-body">
                  <h2 className="card-header">
                    {JSON.parse(JSON.stringify(quest.quest))}
                  </h2>
                  <p>{JSON.parse(JSON.stringify(quest.quest_information))}</p>
                  <div className="card-footer">
                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button
                      className="btn-secondary btn text-base"
                      onClick={() => handlertesst(quest.id)}
                    >
                      <b>Responder</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </LayoutPage>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const questions: IQuestion[] = await qetAllQuestions(); // your fetch function here

  return {
    props: {
      questions,
    },
  };
};

export default AnswersPage;
