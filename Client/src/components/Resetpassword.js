import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button, Box, Grid } from "@mui/material";
import { toast } from "react-toastify";

function Resetpassword() {
  const { token } = useParams();
  const [newPassword, setNewpass] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  console.log("token", token);
  const navigate = useNavigate();

  const handlereset = (e) => {
    e.preventDefault();
    const obj = { token, newPassword, confirmNewPassword };
    console.log("obj", obj);
    axios
      .put("http://localhost:8000/api/resetpassword", obj, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("succfully Changed Password", res);
        navigate("/login");
        toast.success("Successfully Updated the password!!");
      })
      .catch((err) => {
        console.log("Error while Changing the password", err);
      });
  };
  return (
    <>
      <div className="passwordBar">
        <Paper
          elevation={2}
          sx={{
            p: 3,
          }}
        >
          <Box>
            <Grid container spacing={3}>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <h3>Enter new password</h3>
                  <TextField
                    fullWidth
                    label="password"
                    id="div"
                    className="textField"
                    value={newPassword}
                    onChange={(e) => setNewpass(e.target.value)}
                  />

                  <h3>Confirm password</h3>
                  <TextField
                    fullWidth
                    label="confirm password"
                    id="div"
                    className="textField"
                    value={confirmNewPassword}
                    onChange={(e) => setconfirmNewPassword(e.target.value)}
                  />

                  <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 3 }}
                    onClick={handlereset}
                  >
                    Reset password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>
      {/* <div>
        <label htmlFor="">Enter New Password</label>
        <input
          type="text"
          value={newPassword}
          onChange={(e) => setNewpass(e.target.value)}
        />
        <label htmlFor="">Confirm New Password</label>
        <input
          type="text"
          value={confirmNewPassword}
          onChange={(e) => setconfirmNewPassword(e.target.value)}
        />
        <button onClick={handlereset}>ResetPASSWORD</button>
      </div> */}
    </>
  );
}

export default Resetpassword;
