import mongoose from 'mongoose';

export interface IUser {
    _id?: mongoose.Schema.Types.ObjectId;
    username: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true,
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
