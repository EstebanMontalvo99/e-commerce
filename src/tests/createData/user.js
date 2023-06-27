const User = require("../../models/User");

const user = async () => {
  const userCreate = {
    firstName: "Pedro",
    lastName: "Paco",
    email: "pedro@gmail.com",
    password: "pedropaco",
    phone: "0998227362",
  };

  await User.create(userCreate);
};

module.exports = user;
