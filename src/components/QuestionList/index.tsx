import { Box, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import {
  deleteQuestionRequest,
  getQuestionsRequest,
} from '../../redux/actions/questionwebservice';
import { IStoreState, IQuestion } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    header: {
      marginTop: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between',
    },
    margin: {
      margin: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    questionDetails: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
    buttons: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

interface IProps {
  dispatch: Dispatch;
  questions: IQuestion[];
}

const QuestionListView: FC<IProps> = ({ dispatch, questions }): JSX.Element => {
  const classes = useStyles();

  useEffect(() => {
    getMoreQuestions();
  }, []);

  const getMoreQuestions = () => {
    dispatch(getQuestionsRequest());
  };

  const deleteQuestion = (index) => {
    dispatch(deleteQuestionRequest(index));
  };

  return (
    <Grid item xs={5}>
      <Grid className={classes.header}>
        Questions
        <Button
          variant="contained"
          color="primary"
          onClick={() => getMoreQuestions()}
        >
          Fetch More Questions
        </Button>
      </Grid>
      <Grid container spacing={3}>
        {questions.map((question, index) => (
          <Grid item xs={12} key={index}>
            <Paper className={classes.paper}>
              <Box className={classes.questionDetails}>
                <Box>{question.question}</Box>
                <Box>{question.category}</Box>
                <Box>{question.difficulty}</Box>
              </Box>
              <Box className={classes.buttons}>
                <Link to={`/${index}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteQuestion(index)}
                >
                  Delete{' '}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({
  quiz: { questions },
}: IStoreState): { questions: IQuestion[] } => {
  return { questions: questions };
};

export default connect(mapStateToProps)(QuestionListView);
