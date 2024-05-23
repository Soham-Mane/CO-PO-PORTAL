import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';
import RegisterForm from './components/signup/RegisterForm';
import Login from './components/Login/Login';
import Navbar from "./components/Navbar/Navbar";
import Carousel1 from './components/Carousel/Carousel';
import Co from "../src/components/Ut/Co";
import Po from "../src/components/PO/MyForm";
import DropdownExample from "./components/PO/MyForm1";
import Dashboard from "./components/Dashboard";
import TeacherForm from "./components/TeacherForm";
import PracticalExam from "./components/PracticalExam";
import CoPoInput from "./components/CoPoInput";
import Pso from "./components/Pso";

function App() {

  return (
<>

<Router>
  <Routes>
    <Route exact path="/" element={<Navbar/>}></Route>
    <Route exact path="/signup" element={<RegisterForm/>}></Route>
    <Route exact path="/login" element={<Login/>}></Route>
    <Route exact path="/carousel" element={<Carousel1/>}></Route>
    <Route exact path="/co" element={<Co/>}></Route>
    <Route exact path="/PO" element={<Po/>}></Route>
    <Route exact path="/PO1" element={<DropdownExample/>}></Route>
    <Route exact path="/dashboard" element={<Dashboard/>}></Route>
    <Route exact path="/teacher" element={<TeacherForm/>}></Route>
    <Route exact path="/prac" element={<PracticalExam/>}></Route>
    <Route exact path="/copoinput" element={<CoPoInput/>}></Route>
    <Route exact path="/pso" element={<Pso/>}></Route>


  </Routes>
</Router>
</>




  );
}

export default App;
