import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Navbar2 from './Navbar2'
import "./Questions.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { height } from '@mui/system'


function Questions() {
  const [data, setdata] = useState([])
  const [token, settoken] = useState(JSON.parse(localStorage.getItem("data")) || "")
  const [term, setterm] = useState("")
  const [Topic, setTopic] = useState("");
  const [Topics, setTopics] = useState("");
  const [count, setCount] = useState(0);
  const options = Topics
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const navigate = useNavigate();
  const [limit, setlimit] = useState(20);

  useEffect(() => {
    axios
      .get(`http://admin.liveexamcenter.in/api/questions?page=1&limit=${limit}&term=${term}&topic=${Topic} `, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        setdata(res.data.result)

      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, limit, term, count, Topic]);

  useEffect(() => {
    axios
      .get(` http://admin.liveexamcenter.in/api/topics?page=1&limit=&term=&topic=   
        `, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        // setdata(res.data)
        setCount(prev => prev + 1)

        let temp = []
        temp = res.data.result.map((obj, index) => { return temp[index] = obj.name })
        setTopics(temp)

        let result1;

        if (value != null) {
          result1 = res.data.result.filter((obj, index) => obj.name === value)
          console.log("1", result1);
        }
        else {
          setTopic("")
        }
        // console.log(result1[0]._id);
        setTopic(result1[0]._id)

      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, Topic, value]);


  // useEffect(() => {
  //   console.log(Topic);
  // }, [Topic])


  // console.log("Topics", Topic);
  console.log("Value", value);
  return (
    <div>
      <Navbar />
      <Navbar2 />


      <label className='question' style={{ fontSize: "Bold" }}>Questions</label>

      <button type="button" className="btn btn-primary" style={{ position: "absolute", right: 0 }} onClick={() => navigate('/Login/Questions/add')}>+  Add Question</button>


      <div className=' navbar border-bottom ' style={{ margin: "0 0 2%  10%" }}>
        {/* <div> */}
        <input type="checkbox" />

        <label className='m-2' >show  </label>

        <select className='select' value={limit} onChange={(e) => setlimit(e.target.value)}  >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        <label className='m-2'>records per page</label>
        {/* </div> */}

        <div className=" end">
          <input type="text" style={{ marginRight: "50px" }} onChange={(e) => setterm(e.target.value)} />

        </div>

        {/* <Autocomplete
          size="small"
          // placeholder="choose topic"
          onChange={(event, newValue) => {
            setValue(newValue);

          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);

          }}
          id="controllable-states-demo"
          options={Topics}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField  {...params} label="Topic" />}
        /> */}


        <Autocomplete
          id="combo-box-demo"
          size="small"
          options={Topics}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          getOptionLabel={(option) => option}
          style={{ width: 200 }}
          hiddenLabel="true"
          renderInput={(params) => (
            <TextField
              placeholder="Choose Topics"
              {...params}

              variant="outlined"
            />
          )}
        />







      </div>


      <div className='container ' style={{ margin: "0 0 0  10%", marginTop: "0", border: "1px  black" }}>
        {
          data.length > 0 && data.map((obj, id) => {
            return (
              <div key={id} className="container1 border-bottom" style={{ marginBottom: "30px" }}>
                <label>{id + 1}</label>
                <input type="checkbox" />
                <label className='lbl' style={{ marginLeft: "10px", }}> {obj.questionText}</label>

                {
                  obj.options.map((op, index) => {
                    return (
                      <div className="radio" style={{ margin: "0 0 0  2%" }} key={index}>
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
    </div >
  )
}

export default Questions