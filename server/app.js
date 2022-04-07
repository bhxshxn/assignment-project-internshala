const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const port = process.env.PORT || 4000;
app.use(express.json())
app.use(cors())

app.use('/user', require('./routes/user'))
app.use('/todo', require('./routes/todo'))
const url = "mongodb+srv://bhxshxn:bhxshxn@9@cluster0.ixoza.mongodb.net/MediBoxretryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database is connected successfully!!!');
});


app.get('/', (req, res) => {
    res.send("Hello from Backend");
});



app.get('logout',);
app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});