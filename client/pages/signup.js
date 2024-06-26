import React, { useState } from "react";
import axios from "axios";
import Router from "next/router"
import useRequest from "../hooks/useRequest";
const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {doRequest,errors} = useRequest({url:"/api/users/signup",method:"post",body:{
    email,password
  }, onSuccess:()=> Router.push("/")});

  const signUpHandler = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={signUpHandler}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        ></input>
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        ></input>
      </div>
      {errors}
      <button className="btn  btn-primary">Sign Up</button>
    </form>
  );
};

export default signup;
