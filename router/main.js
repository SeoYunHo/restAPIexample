let router = require('express').Router();
let fs = require('fs')

router.route('/list').get(function (req, res) {
    fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
        let users = JSON.parse(data);
        console.log(users);
        res.end();
    });
});

router.route('/:username').get(function (req, res) {
    fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
        let users = JSON.parse(data);
        let username = req.params.username;
        console.log(username);

        res.json(users[username]);
    });
});

router.route('/:username').post(function (req, res) {
    let result = {
        error: null,
        succces: false
    };

    let username = req.params.username;
    console.log(username);

    fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
        let users = JSON.parse(data);
        if (users[username]) {
            result.succces = false;
            result.error = "duplicate";
            res.json(result);
            return;
        }

        users[username] = req.body;
        fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function (err, data) {
            result.succces = true;
            res.json(result);
        });
    });
});

router.route('/:username').delete(function (req, res) {
    let result = {
        error: null,
        succes: false
    };
    let username = req.params.username;
    console.log(username);

    fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
        let users = JSON.parse(data);

        if (!users[username]) {
            result.succes = false;
            result.error = "not fount";
            res.json(result);
            return;
        }

        delete users[username];
        fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function (err, data) {
            result.succes = true;
            res.json(result);
            return;
        });
    });
});

module.exports = router;