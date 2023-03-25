import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import { Dashboard } from '../pages/Dashboard';
//import { Repo } from '../pages/Repo';

//esse tipo de import exige o export default em cada componente
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Repo = React.lazy(() => import('../pages/Repo'));

export const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={'Loading...'}>
      <Switch>
        <Route component={Dashboard} path="/" exact />
        <Route component={Repo} path="/repositories/:repository+" />
      </Switch>
    </React.Suspense>
  );
};
