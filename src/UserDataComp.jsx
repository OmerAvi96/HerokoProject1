import { useState } from "react";
import axios from 'axios';
import { getAll, getById, getByUserId, addItem, updateItem, deleteItem } from './utils'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const UserDataComp = ({ userData, todos, delCall, selectCall, selectedID }) => {

    async function HandleUpdate() {
        await updateItem(USERS_URL, userData.id, userData)
    }
    async function HandleDelete() {
        console.log(userData)
        await deleteItem(USERS_URL, userData.id)
        if (delCall)
            delCall(userData.id)
    }
    function HandleSelect() {
        if (selectCall)
            selectCall(userData.id)
    }
    const [otherDataVisible, setOtherVis] = useState(false);
    // const [borderColor, setBorderColor] = useState('green')
    // const getUser = async () => {
    //     const { data: recievedTodos } = await getByUserId(TODOS_URL, recievedData.id)
    //     setData({
    //         ...userData, id: recievedData.id, name: recievedData.name, email: recievedData.email
    //         , address: { street: recievedData.address.street, city: recievedData.address.city, zipCode: recievedData.address.zipcode }
    //     });
    //     SetTodos(recievedTodos)
    // };


    return (
        <div style={{
            marginBottom: '5px',
            height: 'fit-content',
            width: '300px',
            border: '2px solid black', borderColor: todos.some(item => item.userId === userData.id && !item.completed) ? "red" : "green", display: 'table', padding: 5, backgroundColor: userData.id === selectedID ? 'orange' : 'white',

        }}>
            <label onClick={HandleSelect}>ID: {userData.id}</label>
            <br />
            Name: <input type='text' style={{ width: "140px" }} value={userData.name} onChange={(e) => setData({ ...userData, name: e.target.value })} />
            <br />
            <br />
            Email: <input type='text' style={{ width: "140px" }} value={userData.email} onChange={(e) => setData({ ...userData, email: e.target.value })} />
            <br />
            <br />
            <button onClick={() => setOtherVis(!otherDataVisible)} onMouseEnter={() => setOtherVis(true)} style={{ height: 40 }}>Other Data</button>
            {otherDataVisible && <div style={{ border: '2px solid black', display: 'grid', rowGap: '5px', gridTemplateColumns: '0.5fr 1fr', borderRadius: '10px', padding: 10, margin: 5 }}>
                street: <input type='text' style={{ width: "140px" }} value={userData.address.street} onChange={(e) => setData({ ...userData, address: { ...userData.address, street: e.target.value } })} />
                city: <input type='text' style={{ width: "140px" }} value={userData.address.city} onChange={(e) => setData({ ...userData, address: { ...userData.address, city: e.target.value } })} />
                zipCode: <input type='text' style={{ width: "140px" }} value={userData.address.zipcode} onChange={(e) => setData({ ...userData, address: { ...userData.address, zipcode: e.target.value } })} />
            </div>}
            <button style={{ height: 40, background: 'yellow', float: "right" }} onClick={HandleDelete}>Delete</button>
            <button style={{ height: 40, background: 'yellow', float: "right" }} onClick={HandleUpdate}>Update</button>
        </div>
    );
};

export default UserDataComp;