import Login from './Components/login.jsx';
import ToDoList from './Components/todoList.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/ToDo" component={ToDoList} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
