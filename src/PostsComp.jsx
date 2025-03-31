import { useState } from 'react'

import AddDialogue from './AddNewDialogue';
import PostComp from './PostComp'

const PostsComp = ({ initPosts, selectedID, completeCallback, addNewPostCallback }) => {
    const [addVisible, setAddVis] = useState(false)
    const addCallback = (fields) => {
        setAddVis(false)
        if (fields === undefined)
            return;
        if (addNewPostCallback)
            addNewPostCallback(fields.title, fields.body)
    }
    return (
        (addVisible ?
            <AddDialogue title={"New Post - User " + selectedID} endCallback={addCallback} fields={[{ title: 'Title', type: 'text' }, { title: 'Body', type: 'text' }]} /> :
            <div>
                <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Posts - User {selectedID} {<button style={{ margin: 5, display: 'flex', justifyContent: 'flex-end' }} onClick={() => setAddVis(true)}>Add</button>}
                </span>
                <div style={{ border: '2px solid black', height: '20vh', overflow: 'auto' }}>
                    {initPosts.map((item, i) => {
                        if (item.userId === selectedID)
                            return <PostComp {...item} completeCallback={completeCallback} key={i} />
                    })}
                </div>
            </div>)
    );
};

export default PostsComp;