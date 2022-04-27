import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Navbar2 from './Navbar2'
import axios from 'axios'
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Autocomplete, Button, Modal, TextField } from '@mui/material';



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

function Topic() {

  const [data, setdata] = useState([])
  const [token,] = useState(JSON.parse(localStorage.getItem("data")) || "")
  const [limit, setlimit] = useState(5)
  const [term, setterm] = useState("")
  const [Topic, setTopic] = useState("")


  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setname] = useState("")
  const [Subjects, setSubjects] = useState("");
  const options = Subjects
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [count, setcount] = useState(0);

  useEffect(() => {
    axios
      .get(` http://admin.liveexamcenter.in/api/topics?page=1&limit=${limit}&term=${term}`, {
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
  }, [token, limit, term, count]);

  useEffect(() => {

    axios.get(`http://admin.liveexamcenter.in/api/subjects?term=`,
      {
        headers: {
          Authorization: token.token,

        },
      })
      .then((res) => {
        console.log(res.data.result);
        let temp = []
        temp = res.data.result.map((obj, index) => { return temp[index] = obj.name })
        setSubjects(temp)

        let result1;
        result1 = res.data.result.filter((obj, index) => obj.name === value)
        console.log("1", result1);
        console.log("2", result1[0]._id);
        // setTopic({ subject: result1[0]._id })
        setTopic(result1[0]._id)

      })
      .catch((err) => {
        console.log(err);
      })

  }, [token, value,])

  const addTopic = async () => {

    let payload = { name: name, subject: Topic }
    await axios(`http://admin.liveexamcenter.in/api/topics`, {
      method: "POST",
      data: payload,
      headers: {
        Authorization: token.token,
        "Content-Type": "application/json",
      },
    })
    setOpen(false)
    setcount(prev => prev + 1)

  }

  //  axios.post(`http://admin.liveexamcenter.in/api/topics`,{data :payload},{
  //   headers: {
  //     Authorization: token.token,
  //     "Content-Type": "application/json",
  //   }
  // })
  // axios.delete(`http://admin.liveexamcenter.in/api/topics${id}`)


  const deleteTopic = (id) => {
    console.log(id);

    axios(`http://admin.liveexamcenter.in/api/topics/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token.token,
          "Content-Type": "application/json",
        },
      })
    setcount(prev => prev + 1)
  }



  console.log(data);
  console.log(Topic);

  return (
    <div>
      <Navbar></Navbar>
      <Navbar2></Navbar2>

      <div>
        <label className='question' style={{ fontSize: "Bold" }}>Topic</label>

        <button type="button" className="btn btn-primary" onClick={handleOpen} style={{ position: "absolute", right: 0 }}>+  Add Topic</button>
      </div>

      <div className='navbar border-bottom' style={{ margin: "80px", marginBottom: "10px", marginTop: "0" }}>
        <label className='m-2'>show

          <select className='select' value={limit} onChange={(e) => setlimit(e.target.value)}  >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <label className='m-2'>records</label>
        </label>
        <input type="text" placeholder='serach Topic' className="end" onChange={(e) => setterm(e.target.value)} />
      </div>

      <div className='container ' style={{ margin: "80px", marginTop: "0", border: "1px  black" }}>


        <div>
          <table className='table'>
            <thead>
              <tr>
                <th><input type="checkbox" style={{ marginRight: "5 px" }} /></th>
                <th>Sr No</th>
                <th>Topic</th>
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
                      <td>{data.subject.name} </td>

                      <td>
                        <Grid item xs={8}>
                          <DeleteIcon onClick={() => deleteTopic(data._id)} />
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
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='cnt1 border-bottom '>
            <span href='#' className='m-3' style={{ position: "absolute", right: "1%", top: "0%", width: "20", fontSize: "20px", color: "black", cursor: "pointer" }} onClick={() => setOpen(false)}>x</span>
            <label style={{ fontStyle: "bnd", fontSize: "20px" }}> Add Topic</label>
          </div>

          <label >Subject </label>

          <Grid item xs={6}>
            <Autocomplete
              size='small'
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              style={{ marginRight: "240px" }}
              id="controllable-states-demo"
              options={Subjects}
              sx={{ width: 330 }}
              renderInput={(params) => <TextField  {...params} label="Subject" />}
              inputProps={{ 'aria-label': 'Without label' }}
            />
          </Grid>



          <label >Topic </label>

          <Grid item xs={3} className='cnt border-bottom' >
            <TextField
              size="small"
              error={false}
              type='text'
              id="outlined-error"
              label="Topic"
              // defaultvalue={1}
              // placeholder=''
              value={Topic.name}

              onChange={(e) => setname(e.target.value)}
              sx={{ width: 330, mt: 1, mb: 1 }}
            />
          </Grid>

          <button className='btn' style={{ margin: "5% 2% 0 0", backgroundColor: "#037BFF", width: "100px", border: "none", color: "white" }} onClick={() => addTopic()}>Add</button>

          <button className='btn' style={{ marginTop: "5%", backgroundColor: "#eaede4", width: "100px", border: "none" }} onClick={() => { setOpen(false); }}>Cancle</button>

        </Box>
      </Modal>

    </div>
  )
}

export default Topic  