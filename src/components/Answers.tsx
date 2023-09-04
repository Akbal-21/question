import { useAnswerStore } from "@/store/answer";

export const Answers = () => {
	const ans = useAnswerStore((state) => state.answer);

	return (
		<div className="m-2">
			{ans.map((answer) => {
				return (
					<label className="flex cursor-pointer gap-2" key={answer.answer}>
						<span> {answer.answer}</span>
						<input
							type="radio"
							className="radio radio-success"
							checked={answer.its_correct}
						/>
					</label>
				);
			})}
		</div>
	);
};
