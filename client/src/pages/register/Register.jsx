import React, { useState } from "react";
import "./Register.scss";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload.js";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    phone: "",
    isRestaurant: false,
    isDelivery: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRestaurant = (e) => {
    setUser((prev) => {
      return { ...prev, isRestaurant: e.target.checked };
    });
  };
  const handleDelivery = (e) => {
    setUser((prev) => {
      return { ...prev, isDelivery: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a Member</h1>
          <div className="toggle">
            <label htmlFor="">Activate the restaurant account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleRestaurant} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggle">
            <label htmlFor="">Activate the delivery account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleDelivery} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
