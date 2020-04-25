import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import MainPage from './containers/MainPage';
import TopNav from './components/TopNav';
import AppContentWrapper from './components/AppContentWrapper';
import NotesPage from './containers/NotesPage';

export default function Routes() {
  return (
    <App>
      <TopNav />
      <AppContentWrapper>
        <Switch>
          <Redirect exact from="/" to={routes.MAIN} />
          <Route path={routes.MAIN} component={MainPage} />
          <Route path={routes.NOTES} component={NotesPage} />
          <Route path={routes.NEXT} component={() => <div>Next Project</div>} />
        </Switch>
      </AppContentWrapper>
    </App>
  );
}
