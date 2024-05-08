import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import verifyToken from '../middleware/authMiddleware'
import { Err_CODES,Err_MESSAGES } from "../config/error";



@controller("/users")
export class userController {
    constructor(@inject('UserService') private userService: UserService) { }

    @httpPost('/signup')
    async createUser(req: Request, res: Response): Promise<void> {
        try {

            const { username, password } = req.body;
            await this.userService.createUser(username, password);
            res.status(Err_CODES.CREATED).send("User Created Successfully");
        }
        catch (error) {
            console.log('Error while signUp');
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).json({ message: Err_MESSAGES.INTERNAL_SERVER_ERROR })

        }
    }

    @httpPost("/login")
    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const user: any = await this.userService.getUserByUsername(username);

            if (!user) {
                res.status(Err_CODES.UNAUTHORIZED).json({ error: Err_MESSAGES.UNAUTHORIZED });
                return
            }

            const passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                res.status(401).json({ error: 'Authentication failed' });
                return
            }
            const token = jwt.sign({ userId: user._id }, 'KushalP', { expiresIn: '1h' })
            res.status(Err_CODES.SUCCESSED).json({ token })
        }
        catch (error) {
            console.error("Error logging in");
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).json({ message: Err_MESSAGES.INTERNAL_SERVER_ERROR })

        }
    }

    @httpGet('/',verifyToken)
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(Err_CODES.SUCCESSED).json(users);
        } catch (error) {
            console.error("Error retrieving users:", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).json({ message: Err_MESSAGES.INTERNAL_SERVER_ERROR })

        }
    }

}



