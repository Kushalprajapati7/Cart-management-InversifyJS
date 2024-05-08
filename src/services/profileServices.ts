import { injectable } from "inversify";
import { ProfileModel } from "../models/ProfileModel";
import "reflect-metadata"


@injectable()
export class ProfileService {
    async createProfile(name: string, age: number, userId: string): Promise<void> {
        await ProfileModel.create({ name,age,userId});
    }

    async getProfiles(): Promise<any[]>{
        const profile = await ProfileModel.find({});
        return profile;
    }

    async updateProfile(id: string, name: string, age: number): Promise<any> {
        const profile = await ProfileModel.findByIdAndUpdate(id, { name, age }, { new: true });
        return profile;
    }
    
    async deleteProfile(id:string):Promise<any>{
        const profile = await ProfileModel.findByIdAndDelete(id);
        // return profile;
    }

}