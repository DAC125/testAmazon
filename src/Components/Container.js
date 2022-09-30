import React from "react";
import Header from "./Header";
import Form from "../Pages/Form";
import FormPhase2 from "../Pages/FormPhase2";
import Main from "../Pages/Main";
import RequestDetail from "../Pages/RequestDetail";
import SuccessRegister from "../Pages/SuccessRegister";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./../CSS/Container.css";

const Container = () => {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="Form2" element={<FormPhase2 />} />
          <Route path="SuccessRegister" element={<SuccessRegister />} />
          <Route path="Main" element={<Main />} />
          <Route path="RequestDetail" element={<RequestDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Container;
