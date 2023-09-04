import { ssApi } from "@/api";
import { IQuestion } from "@/interface";
import { useAnswerStore } from "@/store/answer";
import { useRouter } from "next/router";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { AddNewQuestion } from "./AddNewQuestion";
import { Answers } from "./Answers";

interface Props {
	id: number;
}

export const Questions: FC<Props> = ({ id }) => {
	const route = useRouter();
	const anss = useAnswerStore((state) => state.answer);
	const reset = useAnswerStore((state) => state.resetAnswer);

	const [question, setQuestion] = useState<IQuestion>({
		quest: "",
		case_sensitive: false,
		exact_match: false,
	});

	const handleArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setQuestion((prevQuest) => ({
			...prevQuest,
			quest: e.target.value,
		}));
	};

	const handleRadio = (e: ChangeEvent<HTMLInputElement>, label: string) => {
		if (label === "case") {
			setQuestion((prevQuest) => ({
				...prevQuest,
				case_sensitive: e.target.checked,
			}));
		}

		if (label === "exact") {
			setQuestion((prevQuest) => ({
				...prevQuest,
				exact_match: e.target.checked,
			}));
		}
	};

	const handleUpdateDB = async (event: FormEvent) => {
		event.preventDefault();
		const hola = await ssApi({
			method: "POST",
			url: "/quest/",
			data: { question, anss },
		});
		reset();

		setQuestion({
			quest: "",
			case_sensitive: false,
			exact_match: false,
		});
		route.replace("/");
	};

	const one: number = 1;
	return (
		<form onSubmit={handleUpdateDB}>
			<div className="grid place-content-center">
				<div className=" h-full w-96 p-2  bg-emerald-800 rounded-xl">
					<h2 className="text-center">Crea una nueva pregunta</h2>
					<br />
					<div className="w-full bg-primary rounded-md mb-3">
						<b>
							<h1 className="text-center text-xl">ID_Quest : {id + 1}</h1>
						</b>
					</div>
					<div className="w-full bg-primary rounded-lg p-1 mb-3">
						<b>
							<h1 className="text-base ml-2"> Question : </h1>
						</b>
						<textarea
							className="textarea textarea-warning bg-white text-black h-16 w-full m-2 resize-none text-sm"
							value={question.quest}
							onChange={(e) => handleArea(e)}
						/>
					</div>
					<div className="mb-2 bg-primary w-full rounded-md">
						<div className="flex ">
							<div className="w-1/2 m-1">
								<b>
									<h1 className="text-left">Response</h1>
								</b>
							</div>
							<div className="w-1/2 m-1 ">
								<b>
									<h1 className="text-right">Correct</h1>
								</b>
							</div>
						</div>
						<div>
							<Answers />
						</div>
						<br />
						<div>
							<AddNewQuestion />
						</div>
						<div className="m-2">
							<label className="flex cursor-pointer gap-2">
								<span>Case Sensitive</span>
								<input
									type="radio"
									className="radio radio-success"
									checked={question.case_sensitive}
									onChange={(e) => handleRadio(e, "case")}
								/>
							</label>

							<label className="flex cursor-pointer gap-2">
								<span>Exact Match</span>
								<input
									type="radio"
									className="radio radio-success"
									checked={question.exact_match}
									onChange={(e) => handleRadio(e, "exact")}
								/>
							</label>
						</div>
					</div>
					<button className="btn btn-secondary" type="submit">
						Save quest
					</button>
				</div>
			</div>
		</form>
	);
};
