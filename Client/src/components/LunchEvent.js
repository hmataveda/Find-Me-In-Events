import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//Imports from the MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



function LunchEvent() {

    const [eventTitle,setEventTitle]= useState('')
    const [location,setLocation]= useState('')
    const [date,setDate]= useState("0")
    const [time,setTime]= useState("0")
    const [description,setDescription]= useState([])

    //navigate
    const navigate= useNavigate();
    
    //submithandler
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/events', 
        {eventTitle,location,date,time,description}, {withCredentials: true})
        .then(res =>{
            console.log(res.data)
            navigate('/')
        }) .catch(err =>{
            console.log(err)
            
        })
    }


    return (
    <div className="eventLaunchBar" >
        <Card sx={{ maxWidth:700}} className="boxDetails" >
            <form onSubmit={submitHandler}>
        <Box
            sx={{
                width: 500,
                maxWidth: '90%',
            }}>
        <br/>
            <h1>Launch an Event</h1>
            <TextField fullWidth label="Event Title" id="div"  value={eventTitle} onChange={(e)=> setEventTitle(e.target.value)}/>
    </Box>
    <br/>
    <Box
    sx={{
        width: 500,
        maxWidth: '90%'}}>
            <TextField fullWidth label="Location" id="fullWidth"  value={location} onChange={(e)=> setLocation(e.target.value)}/>
    </Box>
    <br/>

    <Box
    sx={{
        width: 500,
        maxWidth: '90%',
    }}
    >
        <TextField fullWidth label="Date" id="fullWidth" value={date} onChange={(e)=> setDate(e.target.value)}/>
    </Box>
    <br/>


    <Box
    sx={{
        width: 500,
        maxWidth: '90%',
    }}
    >
    <TextField fullWidth label="Time" id="fullWidth"  value={time} onChange={(e)=> setTime(e.target.value)}/>
    </Box>
    <br/>
    <Box
    sx={{
        width: 500,
        maxWidth: '90%',
    }}
    >
    <TextField fullWidth label="Description" id="fullWidth"  value={description} onChange={(e)=> setDescription(e.target.value)}/>
    </Box>
    <br/>
    <Stack spacing={2} direction="row" className="eventLaunchButton">
    <Button variant="outlined">Create an Event</Button>
    </Stack>
    <br/>
    </form>
    </Card>
    </div>
    )
}

export default LunchEvent;