import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import QuestionEditor from './QuestionEditor';
import QuestionList from './QuestionList';

const App: FC = () => {
  return (
      <div>
        <Grid container spacing={10}>
          <Switch>
            <Route path="/:id" component={QuestionEditor} />
            <Route path="/" component={QuestionEditor} />
          </Switch>
          <QuestionList />
        </Grid>
      </div>
  );
};

export default App;
