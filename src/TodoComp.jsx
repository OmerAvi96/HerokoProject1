import { useState } from 'react'
import { getAll, getById, getByUserId, addItem, updateItem, deleteItem } from './utils'

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';


const TodoComp = ({ userId, id, title, completed, completeCallback }) => {
    const [isCompleted, setCompleted] = useState(completed)
    const markComplete = async () => {
        setCompleted(true)
        if (completeCallback)
            completeCallback(id)
        try { await updateItem(TODOS_URL, id, { userId, title, completed: true }) }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div style={{ display: 'table', border: '3px solid mediumpurple', padding: 5, margin: 5, marginBottom: 15, width: '-webkit-fill-available' }}>
            Title: {title}
            <br></br>
            Completed: {isCompleted ? 'Yes' : 'No'}
            {!isCompleted && <button style={{ height: 40, float: "right" }} onClick={markComplete}>Mark Complete</button>}
        </div>
    );
};

export default TodoComp;