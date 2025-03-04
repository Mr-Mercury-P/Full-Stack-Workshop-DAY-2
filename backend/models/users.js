const bcrypt = require("bcryptjs")

let users = []

const addUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser={id:users.length + 1, username:username, password:hashedPassword}
    users.push(newUser);
    return newUser;
}

const findUser = (username) => {
    return users.find(user => user.username === username);
}



module.exports = {addUser, findUser}