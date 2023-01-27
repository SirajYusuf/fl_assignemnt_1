const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { FRIEND_STATUS } = require("../helpers/constant")

const FriendSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    status: {
        type: Number,
        enum: Object.values(FRIEND_STATUS),
        default: FRIEND_STATUS.SENT
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = new mongoose.model('Friend', FriendSchema)