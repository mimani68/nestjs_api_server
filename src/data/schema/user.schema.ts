
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    family: String,
    username: String,
    password: String,
    role: String,
    phone: Array,
    birthday: Date,
    verificationCode: String,
    updateTime: Date,
});
