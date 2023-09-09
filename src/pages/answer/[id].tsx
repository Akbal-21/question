import { ssApi, ssPythonApi } from "@/api";
import { LayoutPage } from "@/components/Layout";
import { getAnswers } from "@/db/dbAnswer";
import { getQuestion } from "@/db/dbQuestion";
import { NextPage } from "next";

interface Props {
	id: number;
	quest: string;
	exact_match: boolean;
	case_sensitive: boolean;
	question_id: number;
	test: string[];
}

const AnswerPage: NextPage<Props> = ({
	id,
	quest,
	exact_match,
	case_sensitive,
	question_id,
	test,
}) => {
	const [answer, setAnswer] = useState("");
	const route = useRouter();

	const handleAnswer = async () => {
		const tree = await ssPythonApi({
			method: "POST",
			url: "/spacy",
			data: {
				case_sensitive,
				test,
				exact_match,
				answer,
			},
		});
		await ssApi({
			method: "POST",
			url: "/answer",
			data: {
				question_id,
				answer,
				its_correct: tree["data"]["its_correct"],
			},
		});
		if (tree["data"]["its_correct"]) {
			alert("Respuesta Correcta!!");
			route.replace("/");
			return;
		}
		alert("Respuesta Incorrecta!!");
		route.replace("/");

		return;
	};

	return (
		<LayoutPage title="Responde la pregunta">
			<div className=" m-40">
				<div className="grid place-content-center">
					<div className=" h-full w-96 p-2  bg-emerald-800 rounded-xl">
						<div className="w-full bg-primary rounded-md mb-3">
							<b>
								<h1 className="text-center text-xl">ID_Quest : {id}</h1>
							</b>
						</div>
						<div className="w-full bg-primary rounded-md mb-3">
							<b>
								<h1 className="text-center text-xl">Pregunta : {quest}</h1>
							</b>
						</div>
						<div className="w-full bg-primary rounded-lg p-1 mb-3">
							<b>
								<h1 className="text-base ml-2"> Respuesta : </h1>
							</b>
							<textarea
								className="textarea textarea-warning bg-white text-black h-16 w-full m-2 resize-none text-sm"
								onChange={(e) => setAnswer(e.target.value)}
								value={answer}
							/>
						</div>
						{/* rome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="btn btn-secondary" onClick={handleAnswer}>
							Salvar Respuesta
						</button>
					</div>
				</div>
			</div>
		</LayoutPage>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id = "" } = params as { id: string };
	const pregunta = await getQuestion(Number(id)); // your fetch function here
	const ansers = await getAnswers(Number(id));
	const test: string[] = [];
	for (const key in ansers) {
		if (ansers[key].its_correct) {
			test.push(ansers[key].answer);
		}
	}

	const { quest, exact_match, case_sensitive, question_id } = pregunta[0];
	return {
		props: {
			id,
			quest,
			exact_match,
			case_sensitive,
			question_id,
			test,
		},
	};
};

export default AnswerPage;

//if (!questions[0].question_id) {
//	return <h3>No se pueden cargar los datos</h3>;
//}
