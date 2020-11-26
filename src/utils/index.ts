import { generate } from 'shortid';
import { IQuestion } from '../types';
import { IFormQuestion } from '../types/index';

export const createQuestionForEditForm = (questionDetail: IQuestion) => {
  const { question, correct_answer, incorrect_answers } = questionDetail!;
  const answerObject = incorrect_answers!.map((answer) => ({
    id: generate(),
    answer,
    isCorrect: false,
  }));
  return {
    question,
    answers: [
      { id: generate(), answer: correct_answer, isCorrect: true },
      ...answerObject,
    ],
  };
};

export const setFormValuesToQuestion = (
  editedQuestion: IFormQuestion,
  questionDetail: IQuestion
): IQuestion => {
  return {
    ...questionDetail,
    question: editedQuestion.question,
    correct_answer: editedQuestion.answers.find((a) => a.isCorrect === true)
      ?.answer!,
    incorrect_answers: [
      ...editedQuestion.answers
        .filter((v) => !v.isCorrect)
        .map((a) => a.answer),
    ],
  };
};
