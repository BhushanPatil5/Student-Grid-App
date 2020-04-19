// routes.js
import React from 'react'
import { Route, Switch } from 'react-router-dom'
// App Components
import App from './App';
import StudentDetails from './components/student-details';
import StudentForm from './components/student-form';
import StudentGrid from './components/student-grid';
import StudentEdit from './components/student-edit';



const Routes = () => (
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/student-details/:userId" component={StudentDetails} />
            <Route exact path="/student-form" component={StudentForm} />
            <Route exact path="/student-grid" component={StudentGrid} />
            <Route exact path="/student-edit/:userId" component={StudentEdit} />
        </Switch>
    )

export default Routes