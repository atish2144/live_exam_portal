
import './App.css';
import LoginPage from "./Components/LoginPage"
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom"
import Questions from './Question/Questions';
import Subject from './Question/Subject';
import Topic from './Question/Topic';
import Navbar2 from './Question/Navbar2';
import AddQuestion from './Question/AddQuestion';
import Demo from './Question/Demo';
function App() {
  return (
    <div>
      {/* <LoginPage/> */}
      {/* <Navbar/> */}
      {/* <Navbar2></Navbar2> */}
      {/* <Questions></Questions> */}
      {/* <Demo></Demo> */}
      <Routes>
        <Route path='/*' element={<LoginPage />} />
        <Route exact path='/' element={<LoginPage />} />
        <Route path='/Login' element={<Navbar />} />
        <Route path='/Login/Questions' element={<Questions />} />
        <Route path='/Login/Subject' element={<Subject />} />
        <Route path='/Login/Topic' element={<Topic />} />
        <Route path='/Login/Questions/add' element={<AddQuestion />} />

      </Routes>


    </div>

  );
}

export default App;
