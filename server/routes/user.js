const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    // check for missing filds
    if (!email || !password || !username) {
        res.send({ msg: "Please enter all the fields" })
        return;
    };
    var user = username.charAt(0).toUpperCase() + username.slice(1);

    const doesUserExitsAlreay = await User.findOne({ email });
    if (doesUserExitsAlreay) {
        res.send({ msg: "Email already exists" });
        return;
    };

    const doesUsernameExitsAlreay = await User.findOne({ username: user });
    if (doesUsernameExitsAlreay) {
        res.send({ msg: "Username already exists" });
        return;
    };

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword, username: user });

    latestUser
        .save()
        .then(() => {
            res.send({ msg: "Sucessfully Registered" });
            return;
        })
        .catch((err) => console.log(err));
});

router.post('/login', async (req, res) => {
    var { username, password } = req.body;

    // check for missing filds
    if (!username || !password) {
        res.send("Please enter all the fields");
        return;
    }
    username = username.charAt(0).toUpperCase() + username.slice(1);
    const doesUserExits = await User.findOne({ username });

    if (!doesUserExits) {
        res.send({ msg: "Invalid useranme or password" });
        return;
    }

    const doesPasswordMatch = await bcrypt.compare(
        password,
        doesUserExits.password
    );

    if (!doesPasswordMatch) {
        res.send({ msg: "Invalid useranme or password" });
        return;
    }
    res.send({ msg: "success", user: { username: username } });
})

router.put('/update', async (req, res) => {
    const { email, password, username } = req.body;
    var user = username.charAt(0).toUpperCase() + username.slice(1);
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate({ email: email }, {
        username: user, password: hashedPassword
    }).then((result) => {
        res.send({ msg: "Details Updated Sucessfully" })
    }).catch((err) => {
        console.log(err)
        es.send({ msg: "Some error" })
    })
})

module.exports = router;