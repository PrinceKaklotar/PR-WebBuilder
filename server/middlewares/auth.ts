import {Request, Response} from 'express'
import { NextFunction } from "express";
import { auth } from '../lib/auth';
import { fromNodeHeaders } from 'better-auth/node';


export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try{    
             const session = await auth.api.getSession({
                headers:  fromNodeHeaders(req.headers)
             })

             if(!session || !session?.user) {
                // not login
                return res.status(401).json({message: 'Unauthorized User'})
             }

             req.userId = session.user.id;

             next()
    }
    catch (error : any){
         console.log(error);
         res.status(401).json({message: error.code || error.message})
    }
} 