// controllers/ProfileController.ts
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { ProfileService } from "../services/profileServices";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Err_CODES, Err_MESSAGES } from "../config/error";
import verifyToken from "../middleware/authMiddleware";
import CustomRequest from "../types/customRequest";
import { CartService } from "../services/cartServices";

// @injectable()
@controller("/profile")
export class ProfileController {
    constructor(
        @inject("ProfileService") private profileService: ProfileService,
        @inject("CartService") private cartService: CartService
    ) { }

    @httpPost("/", verifyToken)
    async createProfile(req: CustomRequest, res: Response): Promise<void> {
        try {
            const { name, age } = req.body;
            const userId = req.userId;
            await this.profileService.createProfile(name, age, userId);
            res.status(Err_CODES.CREATED).send("Profile created successfully");
        } catch (error) {
            console.error("Error creating profile:", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).send(Err_MESSAGES.INTERNAL_SERVER_ERROR)

        }
    }


    @httpGet("/", verifyToken)
    async getProfiles(req: CustomRequest, res: Response): Promise<void> {
        try {
            // const userID = this.getUserIdFromSession(req);
            // if (!userID) {
            //     res.status(Err_CODES.SESSIONEXPIRED).send(Err_CODES.SESSIONEXPIRED);
            //     return;
            // }
            const userId = req.userId;

            const profiles = await this.profileService.getProfiles();
            const userProfiles = profiles.filter(profile => profile.userId.toString() === userId);
            res.status(Err_CODES.SUCCESSED).json(userProfiles);
        }
        catch (error) {
            console.log("Error while Retriving Profile", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).send(Err_MESSAGES.INTERNAL_SERVER_ERROR)


        }
    }

    @httpPut('/:id', verifyToken)
    async updateProfile(req: CustomRequest, res: Response): Promise<void> {
        try {
            // const userID = this.getUserIdFromSession(req);
            // if (!userID) {
            //     res.status(Err_CODES.SESSIONEXPIRED).send(Err_CODES.SESSIONEXPIRED);
            //     return;
            // }

            const userId = req.userId;
            if (!userId) {
                res.status(Err_CODES.SESSIONEXPIRED).send(Err_CODES.SESSIONEXPIRED);
                return;
            }
            const profileId: string = req.params.id;
            const { name, age } = req.body;

            const profile = await this.profileService.updateProfile(profileId, name, age);
            console.log(profile);
            res.status(Err_CODES.SUCCESSED).json(profile);

        } catch (error) {
            console.log("Error while Updating Profile", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).send(Err_MESSAGES.INTERNAL_SERVER_ERROR)

        }
    }

    @httpDelete('/:id', verifyToken)
    async deleteProfile(req: CustomRequest, res: Response): Promise<void> {
        try {
            const userID = req.userId;
            if (!userID) {
                res.status(Err_CODES.SESSIONEXPIRED).send(Err_CODES.SESSIONEXPIRED);
                return;
            }
            const { id } = req.params;
            await this.cartService.deleteCartByProfileId(id);
            const deletedProfile = await this.profileService.deleteProfile(id);
            // console.log(deletedProfile);    
            

            res.status(Err_CODES.SUCCESSED).send(Err_MESSAGES.SUCCESSED)

        } catch (error) {
            console.log("Error While deleteing Profile ", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).send(Err_MESSAGES.INTERNAL_SERVER_ERROR)

        }
    }


}
