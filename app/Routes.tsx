import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import JournalPage from './containers/JournalPage';
import MainPage from './containers/MainPage';
import TopNav from './components/TopNav';
import AppContentWrapper from './components/AppContentWrapper';

export default function Routes() {
  return (
    <App>
      <TopNav />
      <AppContentWrapper>
        <Switch>
          <Route path={routes.JOURNAL} component={JournalPage} />
          <Route path={routes.MAIN} component={MainPage} />
          <Route path={routes.NEXT} component={() => <div>Next Project</div>} />
        </Switch>
      </AppContentWrapper>
    </App>
  );
}
