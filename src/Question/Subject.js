import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Navbar2 from './Navbar2'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';


function Subject() {
  const [data, setdata] = useState([])
  const [token, settoken] = useState(JSON.parse(localStorage.getItem("data")) || "")
  const [limit, setlimit] = useState(5)
  const [term, setterm] = useState("")


  useEffect(() => {
    axios
      .get(`http://admin.liveexamcenter.in/api/subjects?page=1&limit=${limit}&term=${term}`, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        setdata(res.data)
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, limit, term]);

  // console.log(data.result);


  return (
    <div>
      <Navbar></Navbar>
      <Navbar2></Navbar2>

      <div>
        <label className='question' style={{ fontSize: "Bold" }}>Subject</label>

        <button type="button" className="btn btn-primary" style={{ position: "absolute", right: 0 }}>+  Add Subject</button>
      </div>


      {/* <div className='navbar border-bottom' style={{ margin: "80px", marginBottom: "10px" }}> */}
      <div className=' navbar border-bottom ' style={{ margin: "0 0 2%  10%" }}>
        <input type="checkbox" style={{ marginRight: "5 px" }} />
        <label className='m-2'>show

          <select className='select' value={limit} onChange={(e) => setlimit(e.target.value)}  >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <label className='m-2' >records</label>
        </label>
        <input type="text" placeholder='serach Subject' class=" end" onChange={(e) => setterm(e.target.value)} />
      </div>


      <div className='container ' style={{ margin: "80px", marginTop: "0", border: "1px  black" }}>


        <div>
          <table className='table'>
            <thead>
              <tr>
                <th><input type="checkbox" style={{ marginRight: "5 px" }} /></th>
                <th>Sr No</th>
                <th>Subject</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data != "" ?
                data.result.map((data, index) => {
                  return (
                    <tr key={index}>

                      <td><input type="checkbox" style={{ marginRight: "5 px" }} /></td>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>
                        <Grid item xs={8}>
                          <DeleteIcon />
                        </Grid>

                      </td>

                    </tr>
                  );
                })
                : "No questions"
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Subject