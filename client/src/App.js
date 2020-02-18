import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Container } from 'reactstrap'

import AppNavBar from './components/AppNavBar'
import GoalsList from './components/GoalsList'
import AddGoalModal from './components/AddGoalModal'


import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container>
          <AddGoalModal/>
          <GoalsList />
        </Container>
      </div>
    </Provider>
  )
}

export default App
