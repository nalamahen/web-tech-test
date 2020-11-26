import React from 'react';
import { mount } from 'enzyme';

import EditForm from '../QuestionEditor/EditForm';
import { IFormAnswers, IFormQuestion } from '../../types/index';

let wrapped;

beforeEach(() => {
  const answers: IFormAnswers[] = [
    { id: '1', answer: 'answer1', isCorrect: true },
    { id: '2', answer: 'answer2', isCorrect: false },
  ];
  const question: IFormQuestion = { question: 'question1', answers };
  const formData = question;
  wrapped = mount(<EditForm formData={formData} onSubmit={() => {}} />);
});

afterEach(() => {
  wrapped.unmount();
});

describe('check form controls', () => {
  it('should have add answer and submit  buttons', () => {
    expect(wrapped.find('button').length).toEqual(2);
  });

  it('should have input text fields', () => {
    expect(wrapped.find('input').length).toEqual(5);
  });
});

/**
 * TODO
 * Test handle change event handlers for question and answers inputs
 * Simulate form submit and test the values
 */

describe('input values', () => {
  beforeEach(() => {
    wrapped
      .find('input')
      .at(0)
      .simulate('change', {
        target: { value: 'question1' },
      });
  });
  it('should question input has correct value', () => {
    expect(wrapped.find('input').at(0).prop('value')).toEqual('question1');
    expect(wrapped.find('input').at(1).prop('value')).toEqual('answer1');
    expect(wrapped.find('input').at(2).prop('value')).toEqual(true);
  });

  xit('should has a question text input  that users can type in ', () => {
    wrapped.update();
    expect(wrapped.find('input').at(0).prop('value')).toEqual('question1');
  });

  xit('should set text area gets empty after submitting', () => {
    wrapped.update();
    wrapped.find('form').simulate('submit');
    wrapped.update();

    expect(wrapped.find('input').at(0).prop('value')).toEqual('question1');
  });
});
