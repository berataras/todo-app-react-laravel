import React, {useState, useContext} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import {UserContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {value, setValue} = useContext(UserContext);
    const navigate = useNavigate();

    async function login(data){
        await axios.post('api/login', data).then((response) => {
            setValue(response.data);
            navigate('/home')
        }).catch((err) => {

        })
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit(login)} className="form-signin">
                <h2 className="form-signin-heading mb-4">Login</h2>
                <input type="text" className="form-control" {...register("username")}  placeholder="username" required=""/>
                <input type="password" className="form-control"{...register("password")} placeholder="password" required=""/>
                <button className="btn btn-lg btn-primary btn-block mt-3 w-100" type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
