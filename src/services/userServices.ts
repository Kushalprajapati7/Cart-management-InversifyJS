import { inject, injectable } from "inversify";
import { UserModel } from "../models/UserModel";
import bcrypt from 'bcrypt'
import "reflect-metadata"
import jwt from 'jsonwebtoken'

@injectable()
export class UserService {
    async createUser(username:string,password:string):Promise<void>{
        const hashedPass =await  bcrypt.hash(password,10);
        await UserModel.create({username, password:hashedPass})
    }

    async loginUser(username:string, password:string):Promise<any>{
        const user = await UserModel.findOne({ username });
        const passwordMatch = await bcrypt.compare(password, user.password)
        const token = jwt.sign({ userId: user._id }, 'KushalP', { expiresIn: '1h' })

        return token;
    }

    async getUserByUsername(username: string): Promise<any> {
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async getAllUsers(): Promise<any[]> {
        const users = await UserModel.find({});
        return users;
    }
}

