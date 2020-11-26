import questionsReducer from '../../reducers/questions';
import * as sportwebservice from '../../actions/questionwebservice';
import { IQuizState } from '../../../types';

describe('reducers', () => {
  it('should handles of type EDIT_QUESTION_REQUEST', () => {
    const question = {
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

    const editedQuestion = {
      category: 'category',
      type: 'type',
      difficulty: 'medium',
      question: 'EditedQuestion',
      correct_answer: 'correct answer',
      incorrect_answers: [
        'incorrect answer1',
        'incorrect answer2',
        'incorrect answer3',
      ],
    };
    const initialQuizState: IQuizState = {
      questions: [question],
    };
    const action = {
      type: sportwebservice.Types.EDIT_QUESTION_REQUEST,
      payload: { index: 0, question: editedQuestion },
    };

    const newState = questionsReducer(initialQuizState, action);

    expect(newState.questions[0]).toEqual(editedQuestion);
  });
});
