import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Navbar2 from './Navbar2'
// import image1 from "../images/fullscreen.png"
import axios from 'axios'
// import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import { Autocomplete, Grid, Box, } from '@mui/material';
// import Paper from '@mui/material';

import TextareaAutosize from '@mui/material/TextareaAutosize';


function AddQuestion() {
    const [, setdata] = useState([])
    const [token,] = useState(JSON.parse(localStorage.getItem("data")) || "")

    const [Topics, setTopics] = useState("");
    const options = Topics
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    const [Topic, setTopic] = useState("")
    // const [count, setcount] = useState(0);

    const [Topics1, setTopics1] = useState("");
    const options1 = Topics1;
    const [Topicvalue, setTopicValue] = useState(options1[0]);
    const [inputTopicValue, setInputTopicValue] = React.useState('');
    // const [Topic1, setTopic1] = useState("");


    const Qtype = ["MULTIPLE CHOICE", "MULTIPLE RESPONSE", "FILL IN BLANKS"]
    const Qoptions = Qtype;
    const [QTypevalue, setQTypeValue] = useState(Qoptions[0]);
    const [QTypeInputValue, setQTypeInputValue] = React.useState('')

    // Difficulty level
    const DlType = ["Easy", "Medium", "Hard"];
    const Dloptions = DlType;
    const [Dlvalue, setDlvalue] = useState(Dloptions[0]);
    const [DlInputValue, setDlInputValue] = React.useState('')
    //option
    const [opt, setopt] = useState(["1", "2", "3", "4"]);
    const [marks, setmarks] = useState(1);
    const [wrongmarks, setwrongmarks] = useState(0);


    //enable rich text area
    const [, setrichtextarea] = useState(false)

    useEffect(() => {

        axios
            .get(`http://admin.liveexamcenter.in/api/subjects?term=   
            `, {
                headers: {
                        Authorization: token.token,
                },
            })
            .then((res) => {
                setdata(res.data.result)
                let temp = []
                temp = res.data.result.map((obj, index) => { return temp[index] = obj.name })
                setTopics(temp)


                console.log(res.data.result);
                let result1;
                result1 = res.data.result.filter((obj, index) => obj.name === value)
                console.log("1", result1);
                setTopic(result1[0]._id)
                // setcount(prev => prev + 1);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [token, value,]);

    useEffect(() => {

        if (Topic !== "") {
            axios
                .get(`http://admin.liveexamcenter.in/api/topics/subject/${Topic}   
        `, {
                    headers: {
                        Authorization: token.token,
                    },
                })
                .then((res) => {
                    console.log(res.data);

                    let temp1 = [];
                    temp1 = res.data.map((obj, index) => { return temp1[index] = obj.name })

                    console.log(temp1);
                    setTopics1(temp1)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token, Topic, value])


    // console.log(data);
    // console.log("2", Topic);
    // console.log("value", value);
    // console.log("Topic Value", Topicvalue);
    // console.log(marks);
    // console.log(wrongmarks);

    // const item = styled(Paper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));




    // const addopt = () => {
    //     let temp = "";
    //     opt.push(temp);
    //     temp = opt
    //     console.log("temp", temp);
    //     setopt(temp)
    // }
    // console.log(opt);



    return (
        <div>
            <Navbar />
            <Navbar2 />

            <div className='container ' style={{ margin: "80px", marginTop: "20px", marginBottom: "0", border: "0.25px solid   black" }}>


                <div className='cnt border-bottom  '>
                    <label className='question' style={{ margin: "2% 0 2% 2%", fontSize: "Bold" }}> Add Question </label>

                </div>

                <div >
                    <label style={{ margin: "20px 0 0px  80px" }}>Select Subject</label>
                    <label style={{ margin: "20px 0 20px  440px" }}>Select Topic </label>

                    {/* <br /> */}

                </div>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>

                        {/* select Subject */}
                        <Grid item xs={6}>
                            <Autocomplete
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
                                options={Topics}
                                sx={{ width: 500 }}
                                renderInput={(params) => <TextField {...params} label="Subject" />}
                                inputProps={{ 'aria-label': 'Without label' }}
                            />
                        </Grid>

                        {/* select Topic         */}
                        <Grid item xs={6}>
                            <Autocomplete

                                value={Topicvalue}
                                onChange={(event, newValue1) => {
                                    // if (value != null) {
                                    setTopicValue(newValue1);
                                    // }
                                    // else {
                                    //     setTopicValue("")
                                    // }
                                }}
                                inputTopicValue={inputTopicValue}
                                onInputChange={(event, newInputValue1) => {

                                    setInputTopicValue(newInputValue1);
                                    console.log(newInputValue1);
                                }}
                                id="controllable-states-demo"
                                options={options1}
                                sx={{ width: 500 }}
                                renderInput={(params) => <TextField {...params} label="Topic" />}
                            />
                            {/* </div> */}
                        </Grid>

                        <div>
                            <label style={{ margin: "10px 40px 10px 50px " }} >Question Type</label>
                            <label style={{ margin: "10px 40px 10px 100px " }} >Difficulty Level</label>
                            <label style={{ margin: "10px 40px 10px 140px " }} >Right marks</label>
                            <label style={{ margin: "10px 40px 10px 150px " }} >Wrong Marks </label>
                        </div>

                        {/* Question Type */}
                        <Grid item xs={3}>
                            <Autocomplete
                                value={QTypevalue}
                                defaultValue={"MULTIPLE RESPONSE"}
                                onChange={(event, newValue2) => {
                                    setQTypeValue(newValue2);
                                }}
                                QTypeInputValue={QTypeInputValue}
                                onInputChange={(event, newInputValue2) => {
                                    setQTypeInputValue(newInputValue2);
                                }}
                                id="controllable-states-demo"
                                options={Qoptions}
                                sx={{ width: 220 }}
                                renderInput={(params) => <TextField {...params} label="." />}
                            />
                        </Grid>

                        {/* Difficulty Level        */}
                        <Grid item xs={3}>
                            <Autocomplete
                                value={Dlvalue}
                                defaultValue={"Medium"}
                                onChange={(event, newValue3) => {
                                    setDlvalue(newValue3);
                                }}
                                inputTopicValue={DlInputValue}
                                onInputChange={(event, newInputValue3) => {
                                    setDlInputValue(newInputValue3);
                                }}
                                id="controllable-states-demo"
                                options={Dloptions}
                                sx={{ width: 220 }}
                                renderInput={(params) => <TextField {...params} label="Controllable" />}
                            />
                        </Grid>

                        {/* Right Marks         */}
                        <Grid item xs={3} >
                            <TextField
                                error={false}
                                type='number'
                                id="outlined-error"
                                label="Marks"
                                // defaultvalue={1}
                                // placeholder=''
                                value={marks}
                                defaultValue={1}
                                onChange={(e) => setmarks(e.target.value)}
                                sx={{ width: 220 }}
                            />
                        </Grid>

                        {/* Wrong Marks  */}
                            <Grid item xs={3} >
                                <TextField
                                    error={false}
                                    type='number'
                                    id="outlined-error"
                                    label="Marks"
                                    // placeholder='1'
                                    value={wrongmarks}
                                    defaultValue={0}
                                    onChange={(e) => setwrongmarks(e.target.value)}
                                    sx={{ width: 220 }}
                                />
                            </Grid>

                        <label style={{ margin: "20px 40px 0px 30px " }} >Question </label>


                        <Grid item xs={12} >
                            <TextareaAutosize
                                aria-label="empty textarea"
                                // placeholder="Empty"  
                                style={{ width: 1060, height: 200 }}
                            />
                        </Grid>

                        <label style={{ color: "gray", marginLeft: "2%", cursor: "pointer " }}
                            onClick={() => setrichtextarea(true)}
                        >Enabel Rich text editor</label>

                        <Grid item xs={12} >
                            <label style={{ margin: " 0 0  0 20px", fontSize: "20px" }}>Options</label>
                            <br />
                        </Grid>
                    </Grid>
                </Box>
                <div>
                    {
                        opt.map((obj, index) => {
                            return (
                                <>
                                    <div className='main'>
                                        <div className="container row mb-3">
                                            <div
                                                className="optbtn col border border-dark text-center"
                                                style={{ backgroundColor: "#E9ECEF" }}
                                            >
                                                <input type="radio" className="mt-5 " />
                                                <label>Option{index + 1}</label>
                                            </div>
                                            <TextareaAutosize
                                                aria-label="empty textarea"
                                                onChange={(e) => console.log(e.target.value)}

                                                // placeholder="Empty"
                                                style={{ width: 900, height: 100, }}
                                            />
                                        </div>
                                    </div>
                                    <label style={{ color: "gray", marginLeft: "1%", cursor: "pointer " }}
                                        onClick={() => setopt((prev) =>
                                            prev.filter((op, ind) => index !== ind))}
                                    >Remove Option     |    </label>

                                    <label style={{ color: "gray", marginLeft: "5%", cursor: "pointer " }}
                                        onClick={() => setrichtextarea(true)}
                                    >Enabel Rich text editor</label>

                                </>
                            )
                        }
                        )
                    }
                </div>
                <label style={{ color: "blue", margin: "2% 0% 3% 1% ", cursor: "pointer " }}
                    // onClick={() => addopt()}
                    onClick={() => setopt((prev) => [...prev, " "])}

                > + Add option </label>
            </div>

            <div className='container ' style={{ margin: "0 80px 0 80px", border: "0.25px solid   black" }}>


                <button style={{ margin: " 10px ", width: "200px", height: "40px", backgroundColor: "#1a75ff" }}>Save Question</button>

                <button style={{ margin: " 10px ", width: "200px", height: "40px", backgroundColor: "#f5f5f0" }}>Cancle</button>

                {/* <button type="button" class="btn btn-primary">Primary</button> */}
            </div>
        </div >
    )
}

export default AddQuestion
