import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Index from '../pages/Index'
// import Info from '../pages/Info'

const Info = React.lazy(()=> import("../pages/Info"))

export default function index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/info">
            <React.Suspense fallback={<div>loading</div>}>
                <Info/>
            </React.Suspense>
        </Route>
      </Switch>
    </Router>
  )
}
