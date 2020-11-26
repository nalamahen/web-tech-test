import { combineReducers } from 'redux';

import questionsReducer from '../reducers/questions';

export default combineReducers({
  quiz: questionsReducer,
});
