import {
  Button,
  Checkbox,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { generate } from 'shortid';
import { listenerCount } from 'stream';
import * as yup from 'yup';
import { IFormQuestion } from '../../types/index';
import TextInput from '../controls/TextInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: theme.spacing(1),
      },
    },
    paper: {
      margin: theme.spacing(0, 1, 0, 1),
      padding: theme.spacing(2),
    },
    question: {
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500,
    },
    answerTextField: {
      width: '95%',
    },
    answers: {
      display: 'flex',
      alignItems: 'center',
    },
    formTitle: {
      margin: theme.spacing(1),
      fontWeight: 'bold',
    },
    answersTitle: {
      margin: theme.spacing(1, 0, 0, 2),
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
    },
    submitButton: {
      margin: theme.spacing(4),
    },
    errorMessage: { color: 'red' },
  })
);

interface answer {
  id: string;
  answer: string;
  isCorrect: boolean;
}

interface IValues {
  question: string;
  answers: answer[];
}

interface IProps {
  onSubmit: (values: IFormQuestion) => void;
  formData: IFormQuestion;
}

const EditForm: React.FC<IProps> = ({ onSubmit, formData }) => {
  const classes = useStyles();

  const validationSchema = yup.object({
    question: yup.string().required('Question can not be empty!'),
    answers: yup
      .array()
      .of(
        yup.object().shape({
          answer: yup.string().required('Answer cant not be empty!'),
        })
      )
      .min(2, 'Minimum of two answers')
  });

  const answerArrayErrors = (errors) =>
    typeof errors.answers === 'string' ? (
      <div className={classes.errorMessage}>{errors.answers}</div>
    ) : null;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <>
          <Grid item className={classes.formTitle}>
            Editor
          </Grid>

          <Paper className={classes.paper}>
            <Form className={classes.root}>
              <Grid item xs={12}>
                <TextInput
                  name="question"
                  id="question"
                  placeholder="Question"
                  className={classes.question}
                />

                <Grid item className={classes.answersTitle}>
                  <Grid item xs={8}>
                    Answers
                  </Grid>
                  <Grid item xs={2}>
                    IsCorrect
                  </Grid>
                  <Grid item xs={2}>
                    X
                  </Grid>
                </Grid>

                <FieldArray name="answers">
                  {({ push, remove }) => (
                    <div>
                      {values.answers.map((a, index) => {
                        return (
                          <Grid
                            container
                            className={classes.answers}
                            key={a.id}
                          >
                            <Grid item xs={8}>
                              <TextInput
                                placeholder="Answers"
                                name={`answers.${index}.answer`}
                                id={`answers.${index}.answer`}
                                className={classes.answerTextField}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Field
                                name={`answers.${index}.isCorrect`}
                                id={`answers.${index}.isCorrect`}
                                type="checkbox"
                                as={Checkbox}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <DeleteIcon onClick={() => remove(index)} />
                            </Grid>
                          </Grid>
                        );
                      })}
                      <Button
                        variant="contained"
                        onClick={() =>
                          push({ id: generate(), answer: '', isCorrect: false })
                        }
                      >
                        Add Answer
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </Grid>

              <Grid item className={classes.errorMessage}>
                {answerArrayErrors(errors)}
              </Grid>
            </Form>
          </Paper>
        </>
      )}
    </Formik>
  );
};

export default EditForm;
