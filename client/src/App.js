import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import AppNavBar from './components/AppNavBar'
import GoalsList from './components/GoalsList'

import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <GoalsList />
      </div>
    </Provider>
  )
}

export default App
