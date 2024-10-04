import { User, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../prisma_client";
import ApiError from "../utils/api_error";
// import { encryptPassword } from '../utils/encryption';

const checkOauthUser = async (
  oauthId: string,
  provider: string
): Promise<User> => {
  try{
    const user = prisma.user.findFirst({
      where: {
        AND: [
          { oauthId: oauthId },
          { provider: provider } 
        ]
      },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  }catch (err) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to check user"
    );
  }
};

const createOauthUser = async (
  email: string,
  oauthId: string,
  provider: string,
  name?: string
): Promise<User> => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        oauthId,
        provider,
        name,
      },
    });
    return user;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create user"
    );
  }
};

export default {
  createOauthUser,
  checkOauthUser
};
