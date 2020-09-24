import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    twitch_id: String,
    channel_name: String,
    display_name: String,
    money: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('User', userSchema)