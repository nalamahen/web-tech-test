import { IFormAnswers, IQuestion } from '../../types';
import { createQuestionForEditForm, setFormValuesToQuestion } from '../index';
import { IFormQuestion } from '../../types/index';

describe('helper functions', () => {
  const questionDetails: IQuestion = {
    category: 'category',
    type: 'type',
    difficulty: 'medium',
    question: 'question1',
    correct_answer: 'correct answer',
    incorrect_answers: [
      'incorrect answer1',
      'incorrect answer2',
      'incorrect answer3',
    ],
  };

  it('should return queston object for editor form', () => {
    const questionForForm = createQuestionForEditForm(questionDetails);
    expect(questionForForm.question).toEqual(questionDetails.question);
  });

  it('should return edited question for quesions list', () => {
    const answers: IFormAnswers[] = [
      { id: '1', answer: 'answer1', isCorrect: true },
      { id: '2', answer: 'answer2', isCorrect: false },
      { id: '2', answer: 'answer3', isCorrect: true },
    ];
    const editedQuestion: IFormQuestion = { question: 'question1', answers };
    const questionForList = setFormValuesToQuestion(
      editedQuestion,
      questionDetails
    );

    expect(questionForList.question).toEqual(editedQuestion.question);
  });

  it('should add only one correct answer to the question', () => {
    const answers: IFormAnswers[] = [
      { id: '1', answer: 'answer1', isCorrect: false },
      { id: '2', answer: 'answer2', isCorrect: true },
      { id: '2', answer: 'answer3', isCorrect: true },
    ];
    const editedQuestion: IFormQuestion = { question: 'question1', answers };
    const questionForList = setFormValuesToQuestion(
      editedQuestion,
      questionDetails
    );
    expect(questionForList.incorrect_answers?.length).toEqual(2);
  });
});
