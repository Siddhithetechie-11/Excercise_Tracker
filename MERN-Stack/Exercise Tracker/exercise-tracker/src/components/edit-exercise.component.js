import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom"

const EditExercise = () => {
    const [State, setState] = useState(false);

    const [Exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        date: '',
    });

    const params = useParams();
    const port = process.env.REACT_APP_PORT | 5000

    useEffect(() => {
        const getExercise = async () => {
            try{

                const allUsers = await fetch(`http://localhost:${port}/exercises/${params.id}`);
                if(allUsers.status === 200){
                    const users = await allUsers.json();
                    Exercise.username = users.username;
                    Exercise.description = users.description;
                    Exercise.duration = users.duration;
                    Exercise.date = users.date;
                    setState(true);
                    console.log(Exercise)
                }else{
                    console.log("Invalid Exercise"); 
                    window.location("/");
                }
            }catch(err){
                console.log(err);
            }
        }
        if(!State) getExercise();
    }, []);

    const onEnter = async (e) => {
        e.preventDefault();
        const newExercise = await fetch(`http://localhost:${port}/exercises/update/${params.id}`, {
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
                <h3>Edit Exercise Log</h3>
                <form onSubmit={onEnter}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <input type="text" 
                        className="form-control" 
                        value={Exercise.username} 
                        onChange={e => setExercise(prev => {return {...prev, username: e.target.value}})}>    
                    </input>
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
                        selected={Date.parse(Exercise.date)}
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

export default EditExercise;