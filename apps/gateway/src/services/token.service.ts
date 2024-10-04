import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import httpStatus from 'http-status';
import config from '../config/config';
import ApiError from '../utils/api_error';
import { Session, TokenType } from '@prisma/client';
import prisma from '../prisma_client';
import { AuthTokensResponse } from '../types/response';

/**
 * Generate a token
 * @param userId 
 * @param expires 
 * @param type 
 * @param secret 
 * @returns 
 */
const generateToken = (
    userId: number,
    expires: Moment,
    type: TokenType,
    secret = config.jwt.secret
): string => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    };
    return jwt.sign(payload, secret);
}

/**
 * Save a token
 * @param {string} token
 * @param {number} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (
    token: string,
    userId: number,
    expires: Moment,
    tokenType: TokenType,
    blacklisted = false
  ): Promise<Session> => {
    const createdToken = prisma.session.create({
      data: {
        token,
        userId: userId,
        expiresAt: expires.toDate(),
        tokenType,
        blacklisted
      }
    });
    return createdToken;
  };

/**
 * verify Token and return token data
 * @param token 
 * @param tokenType 
 * @returns 
 */
const verifyToken = async(token: string, tokenType: TokenType): Promise<Session> => {
    const payload = jwt.verify(token, config.jwt.secret);
    const userId = Number(payload.sub);
    const tokenData = await prisma.session.findFirst({
        where: { token, tokenType, userId, blacklisted: false }
    });
    if (!tokenData) {
        throw new Error('Token not found');
    }
    return tokenData;
}


/**
 * Generate auth token including access token and refresh token
 * @param user 
 * @returns 
 */
const generateAuthToken = async (user: {id: number}): Promise<AuthTokensResponse> => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, TokenType.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires, TokenType.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    };
}

export default {
    generateToken,
    generateAuthToken
}