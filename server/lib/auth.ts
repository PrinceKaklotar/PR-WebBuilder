import 'dotenv/config';
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
// If your Prisma file is located elsewhere, you can change the path
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const trustedOrigins = process.env.TRUSTED_ORIGINS?.split(',') || [];

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
   emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
        await resend.emails.send({
            from: 'onboarding@resend.dev', // use your domain later
            to: user.email,
            subject: 'Reset your password',
            html: `<a href="${url}">Click here to reset your password</a>`
        });
    },
},
    user : {
        deleteUser : {enabled:true}
    },
    trustedOrigins,
    baseURL : process.env.BETTER_AUTH_URL!,
    secret:  process.env.BETTER_AUTH_SECRET!,
    advanced: {
        cookies: {
            session_token : {
                name: 'auth_session',
                attributes : {
                    httpOnly : true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    path: '/',
                }
            }
            
        }
    }
});