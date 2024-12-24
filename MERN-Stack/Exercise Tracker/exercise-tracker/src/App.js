
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import NavBar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import Createuser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br></br>
        <Routes>
          <Route path="/" exact Component={ExercisesList} />
          <Route path="/edit/:id" Component={EditExercise} />
          <Route path="/create" Component={CreateExercise} />
          <Route path="/user" Component={Createuser} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
