import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {

    const [State, setState] = useState(false);

    const [Exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    });

    useEffect(() => {
        const getUsers = async () => {
            try{
                const allUsers = await fetch("http://localhost:5001/users/");
                const users = await allUsers.json();
                if(users.length > 0){
                    Exercise.users = users.map(user => user.username);
                    Exercise.username = users[0].username;
                    setState(true);
                }else{
                    console.log("Users 0"); 
                    window.location("/");
                }
            }catch(err){
                console.log(err);
            }
        }
        if(!State) getUsers();
    }, []);

    const onEnter = async (e) => {
        e.preventDefault();
        const newExercise = await fetch("http://localhost:5001/exercises/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(Exercise)
        });
        if(newExercise.status === 200) window.location.assign('/');
        else alert("Error");
    }
    
    if(State !== false){
        return (
            <div>
                {" "}
                <h3>Create New Exercise Log</h3>
                <form onSubmit={onEnter}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={Exercise.username}
                        onChange={e => setExercise(prev => {return {...prev, username: e.target.value}})}>
                        {
                            Exercise.users.map(user => <option key={user} value={user}>{user}</option>)
                        }
                    </select>
                    </div>
                    <br />
                    <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={Exercise.description}
                        onChange={e => setExercise(prev => {return {...prev, description: e.target.value}})}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={Exercise.duration}
                        onChange={e => setExercise(prev => {return {...prev, duration: Number(e.target.value)}})}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={Exercise.date}
                        onChange={e => setExercise(prev => {return {...prev, date: e}})}
                        />
                    </div>
                    </div>
                    <br />
                    <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }else{return (<p>Loading</p>)}

};

export default CreateExercise;