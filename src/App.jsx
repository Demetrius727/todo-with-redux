import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {

  return (
    <div className='container'>
      <h1>Lista</h1>
      <AddTodo />
      <TodoList />
    </div>
  )
}

export default App
