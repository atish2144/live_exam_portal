import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Navbar2 from './Navbar2'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { fontSize } from '@mui/system';


const style = {
  position: 'absolute',
  top: '25% ',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};


function Subject() {
  const [data, setdata] = useState([])
  const [token, settoken] = useState(JSON.parse(localStorage.getItem("data")) || "")
  const [limit, setlimit] = useState(5)
  const [term, setterm] = useState("")
  const [count, setcount] = useState(0);

  const [subject, setSubject] = useState({ name: "" })

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //id for delete subject


  useEffect(() => {
    axios
      .get(`http://admin.liveexamcenter.in/api/subjects?page=1&limit=${limit}&term=${term}`, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        setdata(res.data)

      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, limit, term, count]);



  const addSubject = async () => {

    await axios("http://admin.liveexamcenter.in/api/subjects", {
      method: "POST",
      data: subject,
      headers: {
        Authorization: token.token,
        "Content-Type": "application/json",
      },
    });

    setOpen(false)
    setcount((prev) => prev + 1)
  }



  console.log(data);
  console.log(subject)


  const deleteSubject = (id) => {
    // console.log(id);
    axios(`http://admin.liveexamcenter.in/api/subjects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token.token,
        "Content-Type": "application/json",
      },
    });
    setcount((prev) => prev + 1)

  }


  return (
    <div>
      <Navbar></Navbar>
      <Navbar2></Navbar2>

      <div>
        <label className='question' style={{ fontSize: "Bold" }}>Subject</label>

        <button type="button" className="btn btn-primary" style={{ position: "absolute", right: 0 }} onClick={handleOpen}>+  Add Subject</button>
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
                          <DeleteIcon onClick={() => deleteSubject(data._id)} />
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='cnt1 border-bottom '>
            <span href='#' className='m-3' style={{ position: "absolute", right: "1%", top: "0%", width: "20", fontSize: "20px", color: "black", cursor: "pointer" }} onClick={() => setOpen(false)}>x</span>
            <label style={{ fontStyle: "bnd", fontSize: "20px" }}> Add Subject</label>
          </div>
          <label >Subject Name</label>

          {/* <div className='cnt border-bottom '> */}
          {/* </div> */}
          <Grid>

            <Grid item xs={12} >
              <TextField
                size="small"
                error={false}
                type="text"
                id="outlined-error"
                label="Subject"
                // placeholder='1'
                value={subject.name}
                // defaultValue=""
                onChange={(e) => setSubject({ name: e.target.value })}
                sx={{ width: 330, minWidth: 200 }}
              />
            </Grid>

            <button className='btn' style={{ margin: "5% 2% 0 0", backgroundColor: "#037BFF", width: "100px", border: "none", color: "white" }} onClick={() => {addSubject();setSubject({name:""})}}>Add</button>

            <button className='btn' style={{ marginTop: "5%", backgroundColor: "#eaede4", width: "100px", border: "none" }} onClick={() => { setOpen(false); setSubject("") }}>Cancle</button>


          </Grid>
        </Box>
      </Modal>
    </div >
  )
}

export default Subject