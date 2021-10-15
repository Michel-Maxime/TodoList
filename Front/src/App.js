
import './App.css';
// eslint-disable-next-line
import {useState, useEffect} from 'react'

function App() {
  const[newTodo, setToDo] = useState("")
  const[data, setData] = useState([])

  useEffect(() => {
    fetch("/todolist")
    .then(res => res.json())
    .then(data => setData(data))
  }, [])

  let AddMessage = async () => {
        
    const rawResponse = await fetch('/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: data.length+1, msg: newTodo})
    });

    const content = await rawResponse.json();

    setData(content)
  }

  let Close = async (id) => {
    fetch('/delete/' + id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => setData(data))
  }

  return (
    <div className="App">
      <div id="myDIV" class="header">
        <h2>My To Do List</h2>
        <input type="text" id="myInput" placeholder="Title..." onChange={event => setToDo(event.target.value)} />
        <span onClick={AddMessage} class="addBtn">Add</span>
      </div>

      <ul id="MyUl">
      {data.map(function (todo) {
        return(
          <li onClick={event => event.target.classList.toggle('checked')}>
            {todo.msg}
            <sapn id={todo.id} class="close" onClick={event => Close(event.target.id)}>{'\u00D7'}</sapn>
          </li>
        )
      })}
      </ul>
    </div>
  );
}

export default App;
