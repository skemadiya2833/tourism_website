import { Response } from "express";

export const setAuthCookies = ( res: Response, accessToken: string, refreshToken: string): void => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: false,
        sameSite: 'lax',
      });

      res.cookie('accessToken', accessToken, {
        httpOnly: false,
        sameSite: 'lax',
      });

}