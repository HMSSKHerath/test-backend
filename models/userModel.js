import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email:
        {
            type: String,
            required: true,
            unique: true,        
        },
        firstName:
        {
            type: String,
            required: true,
        },
        lastName:
        {
            type: String,
            required: true,
        },
        password:
        {
            type: String,
            required: true,
        },
        role:
        {
            type: String,
            required: true,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isBlock:
        {
            type: Boolean,
            default: false
        },
        isEmailVerified:
        {
            type: Boolean,
            default: false
        },
        profileImage:
        {
            type: String,
            default: 'https://example.com/default-profile.png'
        }
     }
);

const User = mongoose.model('User', userSchema);

export default User;