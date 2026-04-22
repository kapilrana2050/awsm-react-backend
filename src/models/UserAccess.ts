import mangoose, { Document, Schema, model } from 'mongoose';

export interface IUserAccess extends Document {
    userId: mangoose.Types.ObjectId;
    clientType: string;
    renewTokenHash: string;
    renewTokenExpiry: Date;
    TokenIssuedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userAccessSchema = new Schema<IUserAccess>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        clientType: { type: String, required: true, maxlength: 50 },
        renewTokenHash: { type: String, required: true },
        renewTokenExpiry: { type: Date, required: true },
        TokenIssuedAt: { type: Date, required: true }
    },
    { timestamps: true}
)

export const UserAccess = mangoose.model<IUserAccess>('UserAccess', userAccessSchema);