import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Index from '../pages/Index'
import Info from '../pages/Info'

export default function index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/info"><Info/></Route>
      </Switch>
    </Router>
  )
}
