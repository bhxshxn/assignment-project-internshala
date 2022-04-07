import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

function ChangePassword() {
    const [data, setData] = useState({
        email: undefined,
        username: undefined,
        password: undefined

    })
    const [status, setStatus] = useState("")
    const submit = async (event) => {
        event.preventDefault()
        const result = await axios.put(`https://assignment-project-internshalb.herokuapp.com/user/update`, data)
        setStatus(result.data.msg)
        setData({
            email: "",
            username: "",
            password: ""
        })
    }
    const inputEvent = (event) => {
        const value = event.target.value
        const name = event.target.name
        setData((prevalue) => {
            if (name === 'email') {
                return {
                    email: value,
                    username: prevalue.username,
                    password: prevalue.password
                }
            } else if (name === 'username') {
                return {
                    email: prevalue.email,
                    username: value,
                    password: prevalue.password
                }
            } else {
                return {
                    email: prevalue.email,
                    username: prevalue.username,
                    password: value
                }
            }
        })
    }
    return (
        <div>
            <form class="form-signin" onSubmit={submit}>
                <h2 class="form-signin-heading">Change Username and Password</h2>
                {status ? (<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    {status}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>) : (<div></div>)}
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="text" class="form-control" placeholder="Email address"
                    required autofocus style={{ marginBottom: 10 }} value={data.email} name='email' onChange={inputEvent} />
                <label for="inputPassword" class="sr-only">Username</label>
                <input type="text" class="form-control" placeholder="Username"
                    required style={{ marginBottom: 10 }} value={data.username} name='username' onChange={inputEvent} />
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" class="form-control" placeholder="Password"
                    required style={{ marginBottom: 10 }} value={data.password} name='password' onChange={inputEvent} />
                <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Submit</button>
            </form>
            <ul class="register">New here?<Link to="/register" class="signup">Sign Up.</Link></ul>
        </div>
    )
}

export default ChangePassword