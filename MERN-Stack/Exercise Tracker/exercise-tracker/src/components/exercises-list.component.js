import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExercisesList = () => {

    const [Check, setCheck] = useState(true);
    const [Exercises, setExercises] = useState([]);
    const port = process.env.REACT_APP_PORT | 5000
    const deleteExercise = async (id) => {
        const deleteExe = await fetch(`http://localhost:${port}/exercises/${id}`, {
            method: "DELETE"
        });
        if(deleteExe.status === 200) setExercises(Exercises.filter(exe => exe._id !== id));        
        else alert("Error");
    }
    useEffect(() => {
        try {
            const data = async () => {
                const exeData = await fetch(`http://localhost:${port}/exercises`);
                setExercises(await exeData.json());
                setCheck(false);
            }
            if(Check) data();
        } catch (err) {
            console.log(err);
        };
    }, []);
    
    if(Check){
        return(<h1>Loading.....</h1>);
    }else{
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        Exercises.map(exer => 
                            <tr key={exer._id}> 
                                <td>{exer.username}</td>
                                <td>{exer.description}</td>
                                <td>{exer.duration}</td>
                                <td>{exer.date.substring(0,10)}</td>
                                <td><Link to={"/edit/"+exer._id}>Edit</Link> | <a href="#" onClick={() => {deleteExercise(exer._id)}}>Delete</a></td>
                            </tr>    
                        )
                    }
                </tbody>
                </table>
            </div>
        );
    }
};

export default ExercisesList;