import { useState } from 'react'

import AddDialogue from './AddNewDialogue';
import TodoComp from './TodoComp'

const TodosComp = ({ initTodos, selectedID, completeCallback, addNewTodoCallback }) => {
    const [addVisible, setAddVis] = useState(false)
    const addCallback = (fields) => {
        setAddVis(false)
        if (fields === undefined)
            return;
        if (addNewTodoCallback)
            addNewTodoCallback(fields.title)
    }
    return (
        (addVisible ?
            <AddDialogue title={"New Todo - User " + selectedID} endCallback={addCallback} fields={[{ title: 'Title', type: 'text' }]} /> :
            <div>
                <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Todos - User {selectedID} {<button style={{ margin: 5, display: 'flex', justifyContent: 'flex-end' }} onClick={() => setAddVis(true)}>Add</button>}
                </span>
                <div style={{ border: '2px solid black', height: '20vh', overflow: 'auto' }}>
                    {initTodos.map((item, i) => {
                        if (item.userId === selectedID)
                            return <TodoComp {...item} completeCallback={completeCallback} key={i} />
                    })}
                </div>
            </div>)
    );
};

export default TodosComp;