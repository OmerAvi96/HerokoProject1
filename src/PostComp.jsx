import { useState } from 'react'
import { getAll, getById, getByUserId, addItem, updateItem, deleteItem } from './utils'

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';


const PostComp = ({ userId, id, title, body }) => {
    return (
        <div style={{ display: 'table', border: '3px solid mediumpurple', padding: 5, margin: 5, marginBottom: 15, width: '-webkit-fill-available' }}>
            Title: {title}
            <br></br>
            Body: {body}
        </div>
    );
};

export default PostComp;