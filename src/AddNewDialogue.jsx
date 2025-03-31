import { Fragment, useState } from 'react'

const AddDialogue = ({ fields, endCallback, title }) => {
    const [returnValues, setRet] = useState({});
    const set = (key, value) => {
        returnValues[key.toLowerCase()] = value;
        setRet({ ...returnValues });
    };
    const handleAdd = (e) => {
        e.preventDefault();
        if (endCallback)
            endCallback(returnValues)
    }
    const handleCancel = (e) => {
        e.preventDefault();
        if (endCallback)
            endCallback(undefined)
    }
    return (
        <>
            <span>
                {title}
            </span>
            <form onSubmit={handleAdd} style={{
                border: '2px solid black',
                width: '500px',
                height: '20vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    flex: 1,  // Allows the div to grow and center its content
                    display: 'flex',
                    justifyContent: 'center',  // Centers vertically
                    alignItems: 'center'  // Centers horizontally
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '50px 140px',
                        alignItems: 'center',
                        justifyItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {
                            fields.map((field, i) => {
                                return (
                                    <Fragment key={i}>
                                        <span>{field.title + ":"}</span>
                                        <input
                                            type={field.type}
                                            required
                                            style={{ height: '20px', width: "140px", margin: '5px' }}
                                            onChange={(e) => set(field.title, e.target.value)}
                                        />
                                    </Fragment>
                                );
                            })
                        }
                    </div>
                </div>
                <span style={{ alignSelf: 'flex-end', marginRight: '10px', marginBottom: '10px' }}>
                    <button onClick={handleCancel} style={{ marginRight: '10px', width: '80px', height: '30px' }}>Cancel</button>
                    <input type='submit' style={{ marginRight: '10px', width: '80px', height: '30px' }} value={'Add'} />
                </span>
            </form>
        </>
    );
};

export default AddDialogue;