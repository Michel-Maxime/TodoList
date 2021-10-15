
import './App.css';
// eslint-disable-next-line
import { useState, useEffect } from 'react'

function App() {
  const [newTodo, setToDo] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/todolist")
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  // eslint-disable-next-line
  let AddMessage = async () => {
    if (document.getElementById("myInput").value !== "") {
      const rawResponse = await fetch('/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: data.length + 1, msg: newTodo, checked: false })
      });
      const content = await rawResponse.json();
      setData(content)
      Clear()
    }
  }

  let Clear = () => {
    setToDo("")
    document.getElementById("myInput").value = ""
  }


  let Close = async (id) => {
    fetch('/delete/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => setData(data))
  }

  let Checked = async (id) => {
    const rawResponse = await fetch('/checked/' + id, {
      method: 'PUT',
    });
    const content = await rawResponse.json();

    setData(content)
  }

  return (
    <div className="App">
      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input type="text" id="myInput" placeholder="Title..." onChange={event => setToDo(event.target.value)} />
        <span onClick={AddMessage} className="addBtn">Add</span>
      </div>

      <ul id="MyUl">
        {data.map(function (todo, key) {
          return (
            <li key={todo.id} className={todo.checked ? "checked" : ""} >
              <div className={todo.checked ? "checked" : ""} onClick={() => Checked(todo.id)}>
                {todo.msg}
              </div>
              <span id={todo.id} className="close" onClick={event => Close(event.target.id)}>{'\u00D7'}</span>
            </li>

          )
        })}
      </ul>
    </div>
  );
}

export default App;
