import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import QuestionList from '../QuestionList';
import QuestionEditor from '../QuestionEditor/index';

describe('check app components contains child', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = shallow(<App />);
  });

  it('should show Question list', () => {
    expect(wrapped.find(QuestionList).length).toEqual(1);
  });
});
