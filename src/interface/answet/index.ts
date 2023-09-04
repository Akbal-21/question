export interface IAnswer {
	answer_id?: number;
	answer: string;
	its_correct: boolean;
	question_id_fk?: number | null;
}

export interface IUserAnswer {
	user_answer_id?: number;
	anser: string;
	its_correct: boolean;
	question_id_fk?: number | null;
	intento: number;
}
