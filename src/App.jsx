import { useState } from 'react'
import UserDataComp from './UserDataComp';
import TodosComp from "./TodosComp";
import PostsComp from './PostsComp';
import { getAll, getById, getByUserId, addItem, updateItem, deleteItem } from './utils'
import AddDialogue from './AddNewDialogue';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);

  const [users, setUsers] = useState([]);
  const [selectedID, setSelectedID] = useState(-1)
  const [search, setSearch] = useState('')
  const [addNewUserVisible, setAddUserVis] = useState(false)

  const getAllUsers = async () => {
    const { data: recievedData } = await getAll(USERS_URL)
    const { data: recievedTodos } = await getAll(TODOS_URL)
    const { data: recievedPosts } = await getAll(POSTS_URL)
    setUsers(recievedData)
    setTodos(recievedTodos)
    setPosts(recievedPosts)
  }
  const SelectUser = (id) => {
    setSelectedID(id)
  };

  const todoCompletedCallback = (todoId) => {
    for (const todo of todos) {
      if (todo.id === todoId) {
        todo.completed = true;
        setTodos(todos)
        setUsers([...users])
        return
      }
    };
  }

  const deleteUserCallback = (id) => {
    const newUsers = users.filter((user) => user.id != id);
    setUsers(newUsers);
    if (selectedID === id)
      setSelectedID(-1)
  }

  const addNewUserCallback = async (fields) => {
    setAddUserVis(false)
    if (fields === undefined)
      return
    const { data: newItem } = await addItem(USERS_URL, {
      "name": fields.name,
      "username": '',
      "email": fields.email,
      "address": {
        "street": '',
        "suite": "",
        "city": "",
        "zipcode": "",
      }
    })
    console.log(newItem)
    setUsers([...users, newItem])
  }

  const addNewTodo = async (todoTitle) => {
    const { data: newItem } = await addItem(TODOS_URL, { completed: false, title: todoTitle, userId: selectedID })
    setTodos([...todos, newItem])
  }
  const addNewPost = async (title, body) => {
    const { data: newItem } = await addItem(POSTS_URL, { body: body, title: title, userId: selectedID })
    setPosts([...posts, newItem])
  }
  if (users.length === 0)
    getAllUsers()
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ border: '2px solid black', borderRadius: '50px', padding: '25px', marginRight: '10px' }}>
          <span >
            Search
            <input type='text' style={{ margin: '10px' }} onChange={(e) => setSearch(e.target.value.toUpperCase())} />
            <button onClick={() => setAddUserVis(true)}>Add</button>
          </span>
          <div style={{ height: '45.5vh', overflow: 'auto' }}>
            {users.map((item, i) => {
              if (search === "" || item.name.toUpperCase().includes(search) || item.email.toUpperCase().includes(search))
                return <UserDataComp delCall={deleteUserCallback} userData={item} todos={todos} selectCall={SelectUser} selectedID={selectedID} key={i} />
            })}
          </div>
        </div>

        <div>
          {addNewUserVisible ? <AddDialogue endCallback={addNewUserCallback} title="Add New User" fields={[{ 'title': 'Name', type: 'text' }, { 'title': 'Email', type: 'email' }]} /> :
            (selectedID > -1 && (
              <div>
                <TodosComp initTodos={todos} selectedID={selectedID} completeCallback={todoCompletedCallback} addNewTodoCallback={addNewTodo} />
                <PostsComp initPosts={posts} selectedID={selectedID} addNewPostCallback={addNewPost} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default App;