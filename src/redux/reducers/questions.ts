import * as sportwebservice from '../actions/questionwebservice';

import { IQuizState } from '../../types';

const initialQuizState: IQuizState = {
  questions: [],
};

const questionReducer = (state = initialQuizState, action) => {
  switch (action.type) {
    case sportwebservice.Types.GET_QUESTIONS_SUCCESS:
      return {
        questions: [...action.payload.results, ...state.questions],
      };
    case sportwebservice.Types.DELETE_QUESTION_REQUEST:
      return {
        questions: [
          ...state.questions.slice(0, action.payload.index),
          ...state.questions.slice(action.payload.index + 1),
        ],
      };
    case sportwebservice.Types.EDIT_QUESTION_REQUEST:
      const newState = state.questions.map((question, index) => {
        if (index === parseInt(action.payload.index)) {
          return action.payload.question;
        }
        return question;
      });
      return { questions: newState };
    default:
      return state;
  }
};

export default questionReducer;
