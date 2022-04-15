import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'    
import Navbar2 from './Navbar2'
import "./Questions.css"
import axios from 'axios'

function Questions() {
  const [data,setdata]=useState([])
  const [token,settoken]=useState(JSON.parse(localStorage.getItem("data"))||"")
  const [typebutton,settypebutton]=useState("");
  useEffect(() => {
    axios
      .get("http://admin.liveexamcenter.in/api/questions?page=1&limit=20&term=&topic",{
      headers: {
          Authorization:token.token  ,
        },
      })
      .then((res) => {
          setdata(res.data)
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);


  return (
    <div>
          <Navbar/>
         <Navbar2/>  


        
        
        <label className='question'>Questions</label>
        <button type="button" className="btn btn-primary">+  Add Question</button>    


        <div className='navbar border-bottom' style={{margin:"80px"}}>
              <input type="checkbox"/>
              <label>Show</label>

              <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>

          </div>

        <div className='container ' style={{margin:"80px",marginTop:"0" ,border:"1px  black"}}>
        {
        data!="" && data.result.map((obj,id)=>{
          return(
           <div key={id} className="container1 border-bottom"> 
           <input type="checkbox"/>
              <label className='lbl' style={{marginLeft:"10px",}}> {obj.questionText}</label>

                {/* {  console.log(obj.options.map((obj1)=>{console.log(obj1.option);}))} */}
                  {
                    obj.options.map((op,index)=>{
                      return(
                          <div className="radio" key={index}>
                                <label>
                                    <input type="radio" 
                                    name="option" 
                                    value={index} 
                                    // onChange={function2}
                                    />
                                     {op.option}
                                </label>
                            </div>
                      );
                  })
                }
          </div>
          )
        })

      }

        </div>
    </div>
  )
}

export default Questions