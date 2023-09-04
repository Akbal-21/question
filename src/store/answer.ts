import { IAnswer } from "@/interface";
import { create } from "zustand";

interface State {
	answer: IAnswer[];
	addAnswer: (answers: IAnswer) => void;
	resetAnswer: () => void;
}

export const useAnswerStore = create<State>((set) => {
	return {
		answer: [],

		// metodos
		addAnswer: (answers: IAnswer) => {
			set((state) => ({
				answer: [...state.answer, answers],
			}));
		},
		resetAnswer: () => set({ answer: [] }),
	};
});
