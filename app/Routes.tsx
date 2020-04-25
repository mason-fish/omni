import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import JournalPage from './containers/JournalPage';
import MainPage from './containers/MainPage';
import TopNav from './components/TopNav';

export default function Routes() {
  return (
    <App>
      <TopNav />
      <Switch>
        <Route path={routes.JOURNAL} component={JournalPage} />
        <Route path={routes.MAIN} component={MainPage} />
      </Switch>
    </App>
  );
}
