import { IAnswer } from "@/interface";
import { useAnswerStore } from "@/store/answer";
import { ChangeEvent, useState } from "react";

export const AddNewQuestion = () => {
	const addans = useAnswerStore((state) => state.addAnswer);
	const [anser, setAnswer] = useState<IAnswer>({
		answer: "",
		its_correct: false,
	});

	const handleadd = () => {
		addans(anser);
		setAnswer({
			answer: "",
			its_correct: false,
		});
	};

	const handlerChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
		if (label === "input") {
			setAnswer((prevAnswer) => ({
				...prevAnswer,
				answer: e.target.value,
			}));
		}
		if (label === "check") {
			setAnswer((prevAnswer) => ({
				...prevAnswer,
				its_correct: e.target.checked,
			}));
		}
	};
	return (
		<div>
			<div className=" flex">
				<div className="w-1/2 m-1">
					<input
						className="input input-warning bg-white text-black"
						type="text"
						value={anser.answer}
						onChange={(e) => handlerChange(e, "input")}
					/>
				</div>
				<div className="w-1/4  ">
					<input
						type="radio"
						className="radio radio-success"
						checked={anser.its_correct}
						onChange={(e) => handlerChange(e, "check")}
					/>
				</div>
				<div className="w-1/4 m-1 ">
					<button
						className="btn btn-sm btn-error m-2"
						onClick={handleadd}
						type="button"
					>
						Add answer
					</button>
				</div>
			</div>
		</div>
	);
};
