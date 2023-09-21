const { Officer } = require("../../db");

const setTypeUser = async (id) => {
  const user = await Officer.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  } else if (user.typeUser === "Admin") {
    await user.update({ typeUser: "Officer" });
  } else {
    await user.update({ typeUser: "Admin" });
  }

  return user;
};

module.exports = setTypeUser;
