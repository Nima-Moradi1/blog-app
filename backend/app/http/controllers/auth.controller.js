const { VerifyRefreshToken, setAccessToken, setRefreshToken } = require("../../utils/functions");
const Controller = require("./controller");
const createError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  validateSignupSchema,
  validateSigninSchema,
  validateUpdateProfileSchema,
} = require("../validators/user/auth.schema");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { UserModel } = require("../../models/user");
const bcrypt = require("bcryptjs");
const renderForgotPasswordTemplate = require("../../utils/renderForgotPasswordTemplate");

class UserAuthController extends Controller {
  constructor() {
    super();
  }
  async signup(req, res) {
    await validateSignupSchema(req.body);
    const { name, email, password } = req.body;

    // checking if the user is already in the data base :
    const existedUser = await this.checkUserExist(email);
    if (existedUser) throw createError.BadRequest("کاربری با این ایمیل وجود دارد");

    // HASH PASSWORD :
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = await UserModel.create({
      name: name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    await setAccessToken(res, user);
    await setRefreshToken(res, user);

    let WELLCOME_MESSAGE = `ثبت نام با موفقیت انجام شد`;

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: WELLCOME_MESSAGE,
        user,
      },
    });
  }
  async signin(req, res) {
    await validateSigninSchema(req.body);
    const { email, password } = req.body;

    // checking if the user is already in the data base :
    const user = await this.checkUserExist(email.toLowerCase());
    if (!user)
      // throw createError.BadRequest("ایمیل یا رمز عبور اشتباه است");
      throw createError.BadRequest("کاربری با این ایمیل وجود ندارد");

    // PASSWORD IS CORRECT :
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) throw createError.BadRequest("ایمیل یا رمز عبور اشتباه است");

    await setAccessToken(res, user);
    await setRefreshToken(res, user);
    let WELLCOME_MESSAGE = `ورود با موفقیت انجام شد`;

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: WELLCOME_MESSAGE,
        user,
      },
    });
  }
  async updateProfile(req, res) {
    const { _id: userId } = req.user;
    await validateUpdateProfileSchema(req.body);
    const { name, email } = req.body;

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      {
        $set: { name, email },
      }
    );
    if (!updateResult.modifiedCount === 0) throw createError.BadRequest("اطلاعات ویرایش نشد");

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "اطلاعات با موفقیت آپدیت شد",
      },
    });
  }
  async updateAvatar(req, res) {
    const { _id: userId } = req.user;
    const { fileUploadPath, filename } = req.body;
    const fileAddress = path.join(fileUploadPath, filename);
    const avatarAddress = fileAddress.replace(/\\/g, "/");
    // const avatarUrl = `${process.env.SERVER_URL}/${avatarAddress}`;
    const updateResult = await UserModel.updateOne(
      { _id: userId },
      {
        $set: { avatar: avatarAddress },
      }
    );
    if (!updateResult.modifiedCount === 0) throw createError.BadRequest("عکس پروفایل آپلود نشد");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "عکس پروفایل با موفقیت آپلود شد",
      },
    });
  }
  async getUserProfile(req, res) {
    const { _id: userId } = req.user;
    const user = await UserModel.findById(userId, { otp: 0 });

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        user,
      },
    });
  }
  async getAllUsers(req, res) {
    const users = await UserModel.find();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        users,
      },
    });
  }
  async refreshToken(req, res) {
    const userId = await VerifyRefreshToken(req);
    const user = await UserModel.findById(userId);
    await setAccessToken(res, user);
    await setRefreshToken(res, user);
    return res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      data: {
        user,
      },
    });
  }
  async checkUserExist(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }
  async forgotPassword(req, res) {
    const FIVE_MINUTES = 5 * 60 * 1000;

    const { email } = req.body;
    const user = await this.checkUserExist(email.toLowerCase());
    if (!user) throw createError.NotFound("کاربری با این ایمیل وجود ندارد");

    if (user.resetPasswordRequestedAt && Date.now() - user.resetPasswordRequestedAt.getTime() < FIVE_MINUTES) {
      const remainingMs = FIVE_MINUTES - (Date.now() - user.resetPasswordRequestedAt.getTime());
      const minutes = Math.floor(remainingMs / 60000);
      const seconds = Math.floor((remainingMs % 60000) / 1000);
      throw createError.TooManyRequests(`لطفاً ${minutes} دقیقه و ${seconds} ثانیه دیگر دوباره تلاش کنید`);
    }
    const crypto = require("crypto");
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiry;
    user.resetPasswordRequestedAt = new Date();
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // You should use a real email sending utility here
    console.log(`Send password reset email to ${user.email}: ${resetLink}`);

    const sendEmail = require("../../utils/sendEmail");
    const html = renderForgotPasswordTemplate(resetLink);
    try {
      await sendEmail(user.email, "بازیابی رمز عبور", html);
    } catch (error) {
      console.error("❌ ارسال ایمیل با خطا مواجه شد:", error);
      throw createError.InternalServerError("خطا در ارسال ایمیل");
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "لینک بازیابی رمز عبور برای ایمیل شما ارسال شد",
      },
    });
  }
  async resetPassword(req, res) {
    const { token, password } = req.body;

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw createError.BadRequest("توکن نامعتبر است یا منقضی شده است");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "رمز عبور با موفقیت بروزرسانی شد",
      },
    });
  }
  logout(req, res) {
    const cookieOptions = {
      maxAge: 1,
      expires: Date.now(),
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
      secure: true,
      path: "/",
      domain: process.env.DOMAIN,
    };
    res.cookie("accessToken", null, cookieOptions);
    res.cookie("refreshToken", null, cookieOptions);

    return res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      auth: false,
    });
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
