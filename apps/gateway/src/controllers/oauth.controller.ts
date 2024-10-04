import httpStatus from "http-status";
import catchAsync from "../utils/catch_async";
import { oauthServices, tokenServices } from "../services";
import exclude from "../utils/exclude";
import { User } from "@prisma/client";
// import exclude from "@/utils/exclude";

const loginOauth = catchAsync(async(req, res) => {
    // const { Authorization } = req.headers;

    const { email, oauthId, provider, name } = req.body;

    // check whether the user is existing
    let user = await oauthServices.checkOauthUser(oauthId, provider);
    // if return null, then the user didn't exist
    if (user === null) {
        // create a new user
        user = await oauthServices.createOauthUser(email, oauthId, provider, name);
    }
    // generate token
    const tokens = await tokenServices.generateAuthToken(user);
    res.send({user, tokens}); 
});

export default {
    loginOauth
}