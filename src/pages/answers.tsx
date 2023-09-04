import { LayoutPage } from "@/components/Layout";
import { getAllAnswers } from "@/db/dbAnswer";
import { qetAllQuestions } from "@/db/dbQuestion";
import { IAnswer, IQuestion } from "@/interface";

interface Props {
	questions: IQuestion[];
	answers: IAnswer[];
}

const AnswersPage: NextPage<Props> = ({ questions, answers }) => {
	const route = useRouter();

	const handlertesst = (id: number | undefined) => {
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
									<h2 className="card-header">{quest.quest}</h2>
									{quest.case_sensitive ? (
										<p className="text-content2">
											Es sensible a mayusculas y minusculas
										</p>
									) : (
										<></>
									)}

									{quest.exact_match ? (
										<p className="text-content2">
											Tiene que coincidir la respuesta con la original
										</p>
									) : (
										<></>
									)}
									<div className="card-footer">
										{/* rome-ignore lint/a11y/useButtonType: <explanation> */}
										<button
											className="btn-secondary btn text-base"
											onClick={() => handlertesst(quest.question_id)}
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

	const answers: IAnswer[] = await getAllAnswers();
	return {
		props: {
			questions,
			answers,
		},
	};
};

export default AnswersPage;
