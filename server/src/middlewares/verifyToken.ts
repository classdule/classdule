import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export function verifyToken(req:Request, res:Response, next:NextFunction){
    const token = req.cookies['access_token']
    if(!token){
        res.status(401).json({})
    }
    const tokenSecret = process.env.JWT_TOKEN_SECRET as Secret
    jwt.verify(token as string, tokenSecret, (err, decoded) => {
        if(err){
            return res.sendStatus(403)
        }
        req.body.user = decoded
        next()
    })
}