/* eslint-disable import/no-unresolved */
import { BaseModel } from 'meteor/socialize:base-model';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
/* eslint-enable import/no-unresolved */

export const BlocksCollection = new Mongo.Collection('socialize:blocks');

export class Block extends BaseModel {
    isDuplicate() {
        return !!BlocksCollection.findOne({ userId: this.userId, blockedUserId: this.blockedUserId });
    }
}

Block.attachCollection(BlocksCollection);

// Create the schema for a Block
Block.appendSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue() {
            if (this.isInsert) {
                return this.userId;
            }
            return undefined;
        },
        index: 1,
        denyUpdate: true,
    },
    blockedUserId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        index: 1,
        denyUpdate: true,
    },
    date: {
        type: Date,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            }
            return undefined;
        },
        index: -1,
        denyUpdate: true,
    },
});
