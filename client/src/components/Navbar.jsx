import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from 'js-cookie'
function Navbar() {
    const logout = () => {
        Cookies.remove('user');
        window.location.reload()
    }

    if (Cookies.get('user')) {
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Login System and Todo</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item ">
                                <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item dropdown ">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {Cookies.get('user')}
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/changePassword" className='dropdown-item'>
                                        Change Password
                                    </Link>
                                    <Link to="#signout" className='dropdown-item' onClick={logout}>
                                        Sign Out
                                    </Link>

                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    } else {
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Login System</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item ">
                                <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/login'>Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }

}

export default Navbar
