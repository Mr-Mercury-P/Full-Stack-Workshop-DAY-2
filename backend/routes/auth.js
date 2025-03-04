const expresss = require("express");
const {addUser, findUser} = require("../models/users");
const {generateToken} = require("../config/jwt");
const bcrypt = require("bcryptjs");
const router = expresss.Router();

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    console.log(username);
    if(findUser(username)) 
    {
        return res.status(400).json({"message":"User already exists"});
    }
    const newUser = await addUser(username, password)
    const token = generateToken(newUser);
    res.json({"message":newUser, token});
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await findUser(username);
    if(!user)
    {
        return res.status(400).json({ "message": "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
    {
        return res.status(400).json({ "message": "Invalid credentials" });
    }
    const token = generateToken(user);
    res.status(200).json({ "message": "Login successful", token });
});

router.get("/register", async (req, res) => {
    res.send("Hi raja");
})

router.get("/debug", async (req, res) => {
    try {
        const users = await findUser();
        res.json({ "message": "Debugging successful", users });
    } catch (error) {
        res.status(500).json({ "message": "Error retrieving data", error });
    }
});

module.exports = router;