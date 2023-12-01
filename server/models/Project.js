const { Schema } = require('mongoose');
const format_date = require('../utils/format_date');

const mongooseLeanGetters = require('mongoose-lean-getters');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const projectSchema = Schema(
    {
        projectName: {
            type: String,
            required: true,
            unique: true
            //?
        },
        projectDescription: {
            type: String,
            required: true,
            //validation: length?
        },
        projectImage: {
            type: Blob,
            required: false //?
        },
        projectVideo: {
            //?
        },
        projectDate: {
            type: Date,
            default: Date.now(),
            get: (timeStamp) => format_date(timeStamp)
        },
        projectExpiration: {
            type: Number,
            required: true,
            //Validation: must be at a latter date: projectDate < projectExpiration
        },
        goal: {
            type: Number,
            required: true,
            //Decimal: 2 places
        },
        comments: [commentSchema], //?
        replies: [{
            commentId: {
                type: Schema.Types.ObjectId,
                //
            },
            replyText: {
                type: String,
                //? length? Can only be made by the person in charge of the project
            }
        }],
        donations: [donationSchema], //?

    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

projectSchema.virtuals('amountCollected').get(() => {
    return; //total $ amount in donations so far
});
projectSchema.virtuals('amountToReachGoal').get(() => {
    return; //goal - amountCollected if amountCollected <= goal
})

//If goal is reached or surpassed, show thank you message to the donors (maybe send email?)

projectSchema.virtuals('numberOfDonations').get(() => this.donations.length);

projectSchema.virtuals('numberOfComments').get(() => this.comments.length);

projectSchema.virtuals('countdownToExpiration').get(() => {
    return; //expirationDate - inceptionDate
})

projectSchema.plugin(mongooseLeanGetters);
projectSchema.plugin(mongooseLeanVirtuals);

module.exports = model('Project', projectSchema);

