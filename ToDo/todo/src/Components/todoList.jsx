import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./todo.jsx"
import "./todo.css";
import Form from "./form.jsx";
import FilterButton from "./filterButton.jsx";

const ToDoList = () => {
  useEffect(() =>
  {
    getCurrentTodos();
  }, []);
  let currentTab = 0;
  let idToEdit;
  const token = localStorage.getItem('token');
  const baseUrl = "https://localhost:5001";
 
  const [toDos, setTodos] = useState([]);
  const [isEditing, setEditing] = useState(false);

  const fetchData = async (url,userData) => {
   
    const data = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token

      },
      body: JSON.stringify(userData)
    });
  
    return data.json();
  }
  function adjustTabChange()
  {
     if (currentTab == 0)
      {
        getCurrentTodos();
      }
      else if (currentTab == 1)
      {
        getPreviousTodos();
      }
      else
      {
        getComingTodos();
        }
  }
  function addToDo(name)
  {
    const url = baseUrl + "/User/CreateToDo";
    const userData = {
      userId: localStorage.getItem('userId'),
      toDo:name
    }
    fetchData(url, userData).then(data => {
        setTodos([...toDos, {
        toDo: name,
        status: "Pending"
      }]);
      })
    
  }
  function getCurrentTodos()
  {
     const url = baseUrl + "/User/GetTodayToDos"
     const userData = {
      userId:localStorage.getItem('userId')
    }
    fetchData(url,userData).then(todos => {
      setTodos(todos);
    })
    ;
  }
  function getPreviousTodos()
  {
     const url = baseUrl + "/User/GetPreviousToDos"
     const userData = {
      userId:localStorage.getItem('userId')
    }
    fetchData(url,userData).then(todos => {
      setTodos(todos);
    })
    ;
  }
  function getComingTodos()
  {
   
     const url = baseUrl + "/User/GetComingToDos"
     const userData = {
      userId:localStorage.getItem('userId')
    }
    fetchData(url,userData).then(todos => {
      setTodos(todos);
    })
    ;
  }
  function changeView(id)
  {
    if (id == "previous")
    {
       currentTab = 1;
      getPreviousTodos();
    }
    else if (id == "current")
    {
      currentTab =0;
      getCurrentTodos();
    }
    else
    {
       currentTab = 2;
      getComingTodos();
    }
  }
  function deleteTodo(id)
  {
    const url = baseUrl + "/User/DeleteToDo";
    const userData = {
      id:parseInt(id)
    }
    fetchData(url, userData).then(data => {
      adjustTabChange();
    })
  }
  function markTodo(id)
  {
    const url = baseUrl + "/User/MarkToDo";
     const userData = {
      id:parseInt(id)
    }
    fetchData(url, userData).then(data => {
      adjustTabChange();
    })
  }
  function editTodo(name)
  {
    const url = baseUrl + "/User/UpdateToDo";
    const userData={
      Id: parseInt(localStorage.getItem("idToEdit")),
      newToDo:name  
    }
    fetchData(url, userData).then(data => {
      adjustTabChange();
      setEditing(false);
    })
  }
  function getTodoId(id)
  {
    localStorage.setItem('idToEdit', id);
    setEditing(true);
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addToDo={addToDo} editTodo={editTodo} isEditing={isEditing}/>
      <div className="filters btn-group stack-exception">    
        <FilterButton name={"Today's Task"} id={"current"} changeView={changeView}/>
        <FilterButton name={"Completed"} id={"previous"}  changeView={changeView}/>
        <FilterButton name={"Coming Up"} id={"coming"}  changeView={changeView}/>
      </div>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {toDos.map((todo) => (
          <Todo name={todo.toDo} key={todo.toDo} id={todo.id} completed={todo.status === "Pending" ? false : true} deleteTodo={deleteTodo} markTodo={markTodo} getTodoId={getTodoId}/>
        ))}
      </ul>
    </div>
  );
};
export default ToDoList;
