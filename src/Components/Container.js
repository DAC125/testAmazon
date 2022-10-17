import React from "react";
import Form from "../Pages/Form";
import FormPhase2 from "../Pages/FormPhase2";
import Main from "../Pages/Main";
import RequestDetail from "../Pages/RequestDetail";
import Declaration from "../Pages/Declaration";
import SuccessRegister from "../Pages/SuccessRegister";
import FailedRegister from "../Pages/FailedRegister";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./../CSS/Container.css";

const Container = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="Exoneration" element={<Form />} />
          <Route path="Form2" element={<FormPhase2 />} />
          <Route path="SuccessRegister" element={<SuccessRegister />} />
          <Route path="FailedRegister" element={<FailedRegister />} />
          <Route path="Main" element={<Main />} />
          <Route path="RequestDetail" element={<RequestDetail />} />
          <Route path="Declaration" element={<Declaration />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Container;
