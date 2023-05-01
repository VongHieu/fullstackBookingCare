import db from "../models/index";
import bcrypt from "bcryptjs";
//Hàm xử lý thông tin user nhập vào
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userNotif = {};
      //check user có tồn tại
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // email tồn tại
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });
        if (user) {
          //so sánh password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            (userNotif.errCode = 0), (userNotif.message = "Ok");
            delete user.password;
            userNotif.data = user;
          } else {
            (userNotif.errCode = 3),
              (userNotif.message = "Wrong your password");
          }
        } else {
          (userNotif.errCode = 1), (userNotif.message = `User not found`);
        }
      } else {
        //email không tồn tại
        (userNotif.errCode = 1),
          (userNotif.message =
            "Your's email not found in system. Please try other email.");
      }
      resolve(userNotif);
    } catch (e) {
      reject(e);
    }
  });
};
//Hàm check email
let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
};
