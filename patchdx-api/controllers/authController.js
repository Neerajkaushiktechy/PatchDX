const user = require('../models/user');
const Token = require('../helper/AuthHelper');

  // Login
  exports.userLogin= async (req, res) => {
    try {
      const { email, password } = req.body;

      // check user email
      const User = await user.findOne({ email });
      if (!User) {
        res.status(400).json({ massage: 'invalid credentials', sucess: false });
      }
      // //check password
      // const isMatched = await User.comparePassword(password);
      // if (!isMatched) {
      //   res.status(400).json({ massage: "invalid credentials", sucess: false })
      // }

      const token = Token.createToken({
        id: User._id,
        userName: User.name,
        email: User.email,
        isStaff: User.is_staff,
      });

      return res.status(200).json({
        success: true,
        Message: 'Login Successfully',
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  exports.userLogout= async (req, res) => {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  };
