import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document{
    name: string,
    age: number,
    height: number,
    weight: number,
    gender: 'Male' | 'Female' | 'Other',
    diet: {
        breakfast: string[],
        lunch: string[],
        dinner: string[]
    },
    goal: string,
    createdAt?: Date;
    updatedAt?: Date; 
}

const userSchema: Schema<User> = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    gender: {type: String, enum: ['Male', 'Female', 'Other'], required: true},
    diet: {
        breakfast: [String],
        lunch: [String],
        dinner: [String]
    },
    goal: {type: String},
    
}, {timestamps: true})

const userModel = (mongoose.models.User) || (mongoose.model<User>("User", userSchema));

export default userModel;