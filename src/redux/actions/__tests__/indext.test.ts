import * as sportwebservice from '../../actions/questionwebservice';
import { IQuizState } from '../../../types';

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

describe('edit question', () => {
  it('should has the correct type', () => {
    const action = sportwebservice.editQuestionRequest(0, editedQuestion);
    expect(action.type).toEqual(sportwebservice.Types.EDIT_QUESTION_REQUEST);
  });

  it('should has the correct payload', () => {
    const action = sportwebservice.editQuestionRequest(0, editedQuestion);

    expect(action.payload).toEqual({ index: 0, question: editedQuestion });
  });
});
