import React from 'react'
import { useNavigate } from "react-router-dom"
function Navbar2() {
  const navigate = useNavigate();
  return (
    <div>

      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary py-0" >

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 py-auto" >

              <label> <li onClick={() => navigate('/Login/Questions')} className="nav-item mt-2 ml-2" style={{ color: "white", marginRight: "20px", cursor: "pointer " }} >
                Question
              </li>
              </label>

              <label> <li onClick={() => navigate('/Login/Subject')} className="nav-item mt-2 ml-2" style={{ color: "white", marginRight: "20px", cursor: "pointer " }} >
                Subject
              </li>
              </label>

              <label> <li onClick={() => navigate('/Login/Topic')} className="nav-item mt-2 ml-2" style={{ color: "white", marginRight: "20px", cursor: "pointer " }} >
                Topic
              </li>
              </label>

              {/* <li className="nav-item">
  <a className="nav-link mt-2 ml-2" href="#"style={{color:"white"}} >Subject</a>
</li>

<li className="nav-item">
  <a className="nav-link mt-2 ml-2" href="#" style={{color:"white"}}>Topic</a>
</li> */}
            </ul>
          </div>
        </nav>
      </div>


    </div>
  )
}

export default Navbar2