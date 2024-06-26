import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import getGoogleOauthURL from "../utils/getGoogleUrl";
import {
  Stack,
  TextField,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { UserContext } from "../components/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const resData = await response.json();
    if (response.status === 200) {
      alert("Login success");
      sessionStorage.setItem("user-id", resData.userId);
      sessionStorage.setItem("jsontoken", resData.token);
      setUserInfo(resData);
      navigate("/audience");
    } else alert("Login failed");
  };
  //login page
  return (
    <div>
      <Grid>
        <Card
          sx={{
            maxWidth: 800,
            padding: "20px 5px",
            margin: "140px auto auto auto",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <CardContent>
            <Typography variant="h5">Login</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ padding: "1rem" }}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    placeholder="Enter Email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    placeholder="Enter Password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#284b63" }}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid xs={12} sm={12} sx={{ textAlign: "center" }}>
                  OR
                </Grid>
                <Grid xs={12} sm={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    href={getGoogleOauthURL()}
                  >
                    Login With Google <span> </span>
                    <GoogleIcon />
                  </Button>
                </Grid>
                {/* <Grid xs={12} sm={12} item>
                  <button type="button" onClick={loginHandler}>
                    <GoogleIcon />
                  </button>
                </Grid> */}
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Login;
