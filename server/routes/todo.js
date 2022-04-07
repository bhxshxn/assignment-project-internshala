const express = require('express');
const router = express.Router();
const Todo = require('../models/todo')

router.post("/create", async (req, res) => {
    const { user, todo } = req.body;
    const latestTodo = new Todo({ username: user, todo: todo });
    latestTodo.save().then(
        (result) => {
            res.send({ msg: "saved" })
        }).catch(err => res.send({ msg: 'some error' }))
})

router.get('/get/:user', async (req, res) => {
    await Todo.find({ username: req.params.user }).then((result) => {
        res.send(result)
    })
})

router.delete('/delete/:id', async (req, res) => {
    id = req.params.id
    await Todo.findByIdAndDelete(id).then(
        (result) => {
            res.send({ msg: "deleted" })
        }
    )
})


module.exports = router;