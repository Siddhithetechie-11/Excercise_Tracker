import { useState } from "react";

const CreateUser = () => {

    const [Exercise, setExercise] = useState({
        username: ''
    })

    const onEnter = async (e) => {
        e.preventDefault();
        const newUser = await fetch("http://localhost:5001/users/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(Exercise)
        })
        if(newUser.status === 200){
            setExercise(prev => {return {...prev, username: ''}})
            alert("User Created");
        }
        else alert("Error");
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onEnter}>
            <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={Exercise.username}
                    onChange={e => setExercise(prev => {return {...prev, username: e.target.value}})}
                    />
            </div>
            <br></br>
            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
            </form>
        </div>
    );
};

export default CreateUser;