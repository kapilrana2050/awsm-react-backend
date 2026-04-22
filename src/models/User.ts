import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  phoneNumber?: string;
  emailConfirmed: boolean;
  languageId: string;
  imageUrl?: string;
  isAdmin: boolean;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    county?: string;
    country?: string;
    postCode?: string;
  };
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, maxlength: 256 },
    passwordHash: { type: String, required: true },
    phoneNumber: { type: String, maxlength: 30 },
    emailConfirmed: { type: Boolean, default: false },
    languageId: { type: String, default: 'EN', maxlength: 5 },
    imageUrl: { type: String, maxlength: 500 },
    isAdmin: { type: Boolean, default: false },
    address: {
      line1: String,
      line2: String,
      city: String,
      county: String,
      country: String,
      postCode: String,
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpiry: Date,
    deletedAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
        delete ret.emailVerificationToken;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpiry;
        return ret;
      },
    },
  }
);

export const User = mongoose.model('User', userSchema);