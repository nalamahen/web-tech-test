import { shallow } from 'enzyme';
import React from 'react';
import App from '../App';
import QuestionList from '../QuestionList';

describe('check app components contains child', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = shallow(<App />);
  });

  it('should show Question list', () => {
    expect(wrapped.find(QuestionList).length).toEqual(1);
  });
});
