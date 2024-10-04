import httpStatus from "http-status";
import catchAsync from "../utils/catch_async";
import { authServices, tokenServices } from "../services";
import { generate, verify } from "password-hash";

const login = catchAsync(async (req, res) => {

    const { email, password } = req.body;

    // check whether the user is existing
    let user = await authServices.checkUser(email);
    // if return null, then the user didn't exist
    if (user === null) {
        return res.status(httpStatus.UNAUTHORIZED).json({ error: "Invalid email" });
    }

    // compare password
    const isMatch = await authServices.comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(httpStatus.UNAUTHORIZED).json({ error: "Invalid credentials" });
    }
    // generate token
    const tokens = await tokenServices.generateAuthToken(user);
    res.send({ user, tokens });
})

const register = catchAsync(async (req, res) => {

    const { email, password, name } = req.body;

    // check whether the user is existing
    let user = await authServices.checkUser(email);
    // if return null, then the user didn't exist
    if (user) {
        return res.status(httpStatus.CONFLICT).json({ error: "Email already exists" });
    }

    // hash password
    const hashedPassword = generate(password);

    // create user
    user = await authServices.createUser(email, hashedPassword, name);

    // generate token
    const tokens = await tokenServices.generateAuthToken(user);
    res.send({ user, tokens });

});

const logout = catchAsync(async(req, res) => {
    const { token } = req.body

    let isDelete = await authServices.deleteSession(token)
    if (!isDelete) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete session" });
    }else {
        return res.status(httpStatus.OK).json({ message: "Logged out successfully" });
    }
});

const verifyEmail = catchAsync(async (req, res) => {
    // TODO: implement email verification
});

const resetPassword = catchAsync(async (req, res) => {
    // TODO: implement reset password
});

const forgotPassword = catchAsync(async (req, res) => {
    // TODO: implement forgot password
});

export default {
    login,
    register
}