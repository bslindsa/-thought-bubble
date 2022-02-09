const {Schema, model} = require('mongoose');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1, 'Not enough characters'],
            max: [280, 'Too many characters']
        },
        createdAt: {
            type: Date, 
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                reactionId: {
                    type: ObjectId,
                    default: new ObjectId,
                },
                reactionBody: {
                    type: String,
                    required: true,
                    max: [280, 'Too many characters'],
                },
                username: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;