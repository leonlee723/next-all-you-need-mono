import { User, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../prisma_client";
import ApiError from "../utils/api_error";
import { generate, verify } from "password-hash";

const checkUser = async (
    email: string): Promise<User | null> => {
        try {
            const user = await prisma.user.findFirst({
                where: { email },
            });
            return user;
        } catch (error) {
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Failed to check user"
            );
        }
    };

const comparePassword = async (
    password: string,
    userPassword: string
): Promise<boolean> => {
    const isMatch = verify(password, userPassword);
    return isMatch
}

const createUser = async (
    email: string,
    hashPassword: string,
    name?: string): Promise<User> => {
        try {
            
            const user = await prisma.user.create({data:{
                email,
                name: name || null,
                password: hashPassword,
                isEmailVerficate: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }});
            return user;
        }catch (error) {
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Failed to create user"
            );
        }
}

const deleteSession = async (token: string): Promise<boolean> => {
    try {
        const deleteSession = await prisma.session.deleteMany({
            where: {
                token
            },
        })
        if(deleteSession.count > 0){
            return true;
        }
    } catch (error) {
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Failed to remove session"
        );
    }
}
    
export default {
    checkUser,
    comparePassword,
    createUser,
    deleteSession
};
