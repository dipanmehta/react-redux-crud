import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import TutorialList from './components/tutorials-list.component';
import AddTutorial from './components/add-tutorial.component';
import Tutorial from './components/tutorial.component';
import 'bootstrap';
import $ from 'jquery';
window.jQuery = window.$ = $;


function App() {
  return (
    <div className="App">
        
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Coder
          </Link>
          <Link to={"/tutorials"} className="nav-link">
            Tutorials
          </Link>
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </nav>
        <Routes>
          <Route exact path={"/"} element={<TutorialList />} />
          <Route exact path="/add" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
