import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

function Home() {
    const [list, setList] = useState([])
    const [todo, setTodo] = useState("")
    useEffect(async () => {
        await axios.get(`https://assignment-project-internshalb.herokuapp.com/todo/get/${Cookies.get('user')}`).then(
            (result) => {
                setList(result.data)
            }
        )
        console.log(list)
    }, [todo])
    const submit = async (event) => {
        event.preventDefault()
        const result = await axios.post(`https://assignment-project-internshalb.herokuapp.com/todo/create`, {
            user: Cookies.get('user')
            , todo: todo
        }).then((result) => {
            setTodo("")
        })
    }
    const deleteTodo = async (event, id) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to delete?')) {
            await axios.delete(`https://assignment-project-internshalb.herokuapp.com/todo/delete/${id}`).then(
                (result) => {
                    setTodo(null)
                }
            )
        } else {
            console.log('Thing was not saved to the database.');
            setTodo(null)
        }
    }
    return (
        <>
            <header class="bg-success text-white p-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <font face="Comic sans MS"
                                size="11" color="black">
                                <strong>ToDo List</strong>
                            </font>

                        </div>
                    </div>
                </div>
            </header>

            <div class="container mt-3">
                <h2>Add Items</h2>
                <form id="addForm" onSubmit={submit}>
                    <div class="row">
                        <div class="col-lg-7 col-md-7 col-sm-7">
                            <input type="text" class="form-control" id="item" onChange={e => setTodo(e.target.value)} value={todo} />
                        </div>

                        <div class="col-lg-5 col-md-5 col-sm-5">
                            <input type="submit" class="btn btn-dark"
                                id="submit" value="Submit" />
                        </div>
                    </div>
                </form>

                <h3 class="mt-4">Tasks</h3>
                {list.map(ele => (
                    <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
                        <p>{ele.todo}</p> <button class="btn btn-danger" onClick={() => { deleteTodo(event, ele._id) }}>Delete</button>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Home
