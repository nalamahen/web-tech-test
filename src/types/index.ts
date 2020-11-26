export interface IQuestionResponse {
  response_code: number;
  results?: IQuestion[] | null;
}

export interface IQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers?: string[] | null;
}

export interface IStoreState {
  quiz: IQuizState;
}

export interface IQuizState {
  questions: IQuestion[];
}

export interface IFormQuestion {
  question: string;
  answers: IFormAnswers[];
}

export interface IFormAnswers {
  id: string;
  answer: string;
  isCorrect: boolean;
}
