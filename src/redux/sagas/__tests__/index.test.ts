import { takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/questionwebservice';
import { getQuestions, watchGetQuestionsRequest } from '../questions';

describe('fetch questions flow', () => {
  const generator = watchGetQuestionsRequest();

  it('should wait for every GET_QUESTIONS_REQUEST action and call getQuestions request', () => {
    expect(generator.next().value).toEqual(
      takeEvery(actions.Types.GET_QUESTIONS_REQUEST, getQuestions)
    );
  });

  it('should be done on next iteration', () => {
    expect(generator.next().done).toBeTruthy();
  });
});
