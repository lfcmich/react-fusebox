import '@babel/polyfill'
import * as React from 'react'
import ReactDOM from 'react-dom'
import Index from './pages/Index'
import Router from './routes'

ReactDOM.render(<Router />, document.getElementById('root'))
