import mongoose, { Schema } from 'mongoose';
import { IUser } from './UserModel';

export interface IProfile{
    UserId: IUser['_id'],
    name: string,
    age: number
}

const profileSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: [true, 'Please enter name'] },
    age: { type: Number, required: [true, 'Please enter your age'] }
}, {
    timestamps: true
});

export const ProfileModel = mongoose.model<IProfile>('Profile', profileSchema)