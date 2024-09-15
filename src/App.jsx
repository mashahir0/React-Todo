
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [getVal, setGetVal] = useState('')
  const [todo, setTodo] = useState([])
  const [edit, setEdit] = useState(false)
  // const [done,setDone] = useState(false)
  const [editedTodo, setEditetdTodo] = useState(null)
  console.log(getVal);




  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  })

  const newTodo = getVal.trim()

  const addTodo = () => {
    if (newTodo && !todo.some(val => val.text.toLowerCase() === newTodo.toLowerCase())) {
      setTodo([...todo, { id: Date.now(), text: getVal, complete: false }])
      setGetVal('')
    } else if (!newTodo) {
      alert('it cannot be empty ')
    } else {
      alert('Todo alredy exist ')
    }
    if (edit) {

      setTodo(todo.map(val => val.id === editedTodo.id ? { ...val, text: newTodo } : val))
      setEdit(false)
      setEditetdTodo(null)

    }
    
  }
  console.log(todo);
  

  const deleteTodo = (id) => {
    const newTask = todo.filter((val) => val.id !== id)
    setTodo(newTask)
  }



  const editTodo = (id) => {
    const todoToEdit = todo.find(val => val.id === id)
    setGetVal(todoToEdit.text)
    setEditetdTodo(todoToEdit)
    setEdit(true)
  }
  const complete = (id) => {
    
    setTodo(todo.map(val => val.id === id ? { ...val, complete:  true} : val))
  }
  const complist =  todo.filter((val)=>val.complete )
  console.log(complist);
  

  return (
    <>
      <div className="container">
        <h1>Todo App</h1>
        <div className="input-area">
          <input ref={inputRef} type="text" id="new-task" placeholder="Enter new task..." value={getVal} onChange={(e) => setGetVal(e.target.value)} />
          <button id="add-btn" onClick={addTodo} >{edit ? 'Save' : 'Add'}</button>
        </div>
        <div className="list-area">
          <ul id="todo-list">

            {
              todo.map((ele) => {
                return <li key={ele.id}>
                  <span className="todo-text" style={{ textDecoration: ele.complete ? 'line-through' : null }}>{ele.text}</span>
                  <button className="completed-btn" onClick={() => complete(ele.id)}  >Completed</button>
                  <button className="edit-btn" onClick={() => editTodo(ele.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteTodo(ele.id)}>Delete</button>
                </li>
              })
            }
          </ul>
        </div>
      </div>
      <div className='container'>
        <h3>completed tasks</h3>
        <div className='list-area'>
        <ul className='todo-list'>
          {
           complist.map((val)=>{
            return <li>{val.text}</li>
           })
          }
        </ul>
        </div>
      </div>
    </>
  )
}

export default App
