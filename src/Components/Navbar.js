
import React from 'react'
import image1 from "../images/logo1.svg"
import { useNavigate } from "react-router-dom"
function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark" >

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 py-auto" >
            <li className="nav-item active py-0.025">
              <img src={image1} width="150px" style={{ marginRight: "30px" }} alt="logo" />
              {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
            </li>

            <label><li onClick={() => navigate("/Login")} className="nav-item mt-3   ml-2" style={{ color: "white", marginRight: "20px", cursor: "pointer " }}>
              Dashboard
            </li></label>

            <li onClick={() => navigate('/Login/Questions')} className="nav-item mt-3   ml-2" style={{ color: "white", marginRight: "20px", cursor: "pointer " }}>
              Question
            </li>

            <label><li className="nav-item mt-3   ml-2" style={{ color: "white", marginRight: "20px" }}>
              Test
            </li></label>

            <label><li className="nav-item mt-3   ml-2" style={{ color: "white", marginRight: "20px" }}>
              Reports
            </li></label>





            {/* <li className="nav-item">
        <a className="nav-link mt-2 ml-2" href="#"style={{color:"white"}} >Questions</a>
      </li>

      <li className="nav-item">
        <a className="nav-link mt-2 ml-2" href="#" style={{color:"white"}}>Tests</a>
      </li>

      <li className="nav-item">
        <a className="nav-link mt-2 ml-2" href="#"style={{color:"white"}}>Reports</a>
      </li> */}



          </ul>
        </div>
      </nav>

    </div>
  )
}

export default Navbar