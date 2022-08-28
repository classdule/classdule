import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export function verifyToken(req:Request, res:Response, next:NextFunction){
    let token = req.headers['x-access-token']
    if(!token){
        res.status(403).json({
            message:'No token provided'
        })
    }
    const tokenSecret = process.env.JWT_TOKEN_SECRET as Secret
    jwt.verify(token as string, tokenSecret, (err, decoded) => {
        if(err){
            return res.status(403).json({
                message:'Acesso não autorizado'
            })
        }
        req.body.user = decoded
        next()
    })
}