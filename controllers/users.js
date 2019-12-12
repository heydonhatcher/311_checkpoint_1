const users = require("../data/index");

const counter = users.length;

const userNotNull = user => {
  console.log(user);
  if (user) {
    return true;
  } else {
    return false;
  }
};

const listUsers = (req, res) => {
  res.json(users);
};

const showUser = (req, res) => {
  const id = req.params.id;
  let user = users.find(user => user.id === Number(id));
  console.log(userNotNull());
  if (userNotNull(user) == true) {
    res.json(users);
  } else {
    res.status(400).send({ error: "ID did not match!" });
  }
};

const createUser = (req, res) => {
  let conType = req.headers["content-type"];
  if (!conType || conType !== "application/json") {
    return res.status(400).send({ error: "Request body not valid JSON" });
  } else {
    let user = req.body;
    if (Array.isArray(user)) {
      return res.status(400).send({ error: "Request body was an array" });
    } else {
      user.id = counter + 1;
      users.push(user);
      res.send(user);
      counter++;
    }
  }
};

const updateUser = (req, res) => {
  const id = req.params.id;
  let user = users.find(user => user.id === Number(id));
  if (userNotNull(user) == true) {
    user = Object.assign(user, req.body);
    console.log(user);
    res.json(users);
  } else {
    res.status(400).send({ error: "ID did not match!" });
  }
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  let user = users.find(user => user.id === Number(id));
  if (userNotNull(user) == true) {
    let userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    res.json(users);
  } else {
    res.status(400).send({ error: "ID did not match!" });
  }
};

module.exports = {
  listUsers,
  showUser,
  createUser,
  updateUser,
  deleteUser
};
