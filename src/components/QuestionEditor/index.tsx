import { Grid } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { editQuestionRequest } from '../../redux/actions/questionwebservice';
import { IQuestion, IStoreState } from '../../types/index';
import { setFormValuesToQuestion } from '../../utils';
import { createQuestionForEditForm } from '../../utils/index';
import EditForm from './EditForm';

interface IProps {
  questions: IQuestion[];
  dispatch: Dispatch;
}

const QuestionEditor: FC<IProps> = ({ dispatch, questions }): JSX.Element => {
  let params = useParams();

  const [questionDetail, setQuestionDetail] = useState<IQuestion>({
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const questionToEdit = questions.find(
      (question, index) => index === parseInt(params.id)
    );

    if (questionToEdit) {
      const {
        category,
        type,
        difficulty,
        question,
        correct_answer,
        incorrect_answers,
      } = questionToEdit;

      setQuestionDetail({
        category: category,
        type: type,
        difficulty: difficulty,
        question: question,
        correct_answer: correct_answer,
        incorrect_answers: incorrect_answers,
      });

      setDataLoaded(true);
    }
  }, [params, questions]);

  return (
    <Grid item xs={7}>
      {dataLoaded && (
        <EditForm
          onSubmit={(values) => {
            dispatch(
              editQuestionRequest(
                params.id,
                setFormValuesToQuestion(values, questionDetail)
              )
            );
          }}
          formData={createQuestionForEditForm(questionDetail)}
        />
      )}
    </Grid>
  );
};

const mapStateToProps = (state: IStoreState) => {
  return { questions: state.quiz.questions };
};

export default connect(mapStateToProps)(QuestionEditor);
