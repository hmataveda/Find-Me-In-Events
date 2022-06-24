import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    ListItem,
    List,
} from "@mui/material";

const LoginRegistrationForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        confirmPassword: "",
    });
    const [regErr, setRegisterErrors] = useState([]);
    const [logErr, setLogErrors] = useState("");

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const OnSubmitHandlerRegistration = (e) => {
        console.log("submitting registration");
        e.preventDefault();
        console.log("USER: ", user);
        axios
            .post("http://localhost:8000/api/register", user, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("successfully registered", res.data);
                setIsLoggedIn(true);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                setLogErrors("");
                const errorarray = (obj) => {
                    const arr = [];
                    for (let keys of Object.keys(obj)) {
                        arr.push(obj[keys].message);
                    }
                    setRegisterErrors(arr);
                };
                errorarray(err.response.data.errors);
            });
    };

    const OnSubmitHandlerLogin = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/login",
                {
                    emailId: user.emailId,
                    password: user.password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                console.log("successfully loggedIn", res.data);
                setIsLoggedIn(true);
                navigate("/home");
            })
            .catch((err) => {
                setRegisterErrors([]);
                setLogErrors(err.response.data.Error);
                console.log("Error with login post request client", err);
            });
    };

    return (
        <Paper elevation={2} sx={{ p: 10, m: 5, display: "flex" }}>
            <Box sx={{ flexGrow: 1, mr: 5, ml: 3 }}>
                <Typography variant="h3" component="h1" sx={{ fontSize: 30 }}>
                    Registration
                </Typography>
                {regErr && (
                    <List sx={{ mb: 5 }}>
                        {regErr.map((error, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    sx={{ color: "error.main" }}
                                >
                                    {error}
                                </ListItem>
                            );
                        })}
                    </List>
                )}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid container item spacing={1}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    name="emailId"
                                    label="Email"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={OnSubmitHandlerRegistration}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, ml: 5, mr: 3 }}>
                <Typography variant="h3" component="h1" sx={{ fontSize: 30 }}>
                    Login
                </Typography>
                <List sx={{ mb: 5, color: "error.main" }}>
                    {logErr && <p>{logErr}!!</p>}
                </List>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid container item spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="emailId"
                                    label="Email"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={OnSubmitHandlerLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default LoginRegistrationForm;
