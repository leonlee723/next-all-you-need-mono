import Joi from "joi";
import { password } from "./custom";

const oauthLogin = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      oauthId: Joi.string().required(),
      provider: Joi.string().required()
    })
  };

const register = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      name: Joi.string().required()
    })
  };
  
  const login = {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required()
    })
  };
  
  const logout = {
    body: Joi.object().keys({
      refreshToken: Joi.string().required()
    })
  };
  
  const refreshTokens = {
    body: Joi.object().keys({
      refreshToken: Joi.string().required()
    })
  };
  
  const forgotPassword = {
    body: Joi.object().keys({
      email: Joi.string().email().required()
    })
  };
  
  const resetPassword = {
    query: Joi.object().keys({
      token: Joi.string().required()
    }),
    body: Joi.object().keys({
      password: Joi.string().required().custom(password)
    })
  };
  
  const verifyEmail = {
    query: Joi.object().keys({
      token: Joi.string().required()
    })
  };
  
  export default {
    oauthLogin,
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    verifyEmail
  };