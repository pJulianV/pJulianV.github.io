const User = require('./models');

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send('Usuario creado con éxito');
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};