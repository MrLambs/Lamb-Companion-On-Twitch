import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: false
    },
    money: {
        type: Number,
        required: true,
    }
});

module.exports = User => {
    User = mongoose.model('User', UserSchema)
};