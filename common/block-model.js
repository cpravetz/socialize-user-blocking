import { BaseModel } from 'meteor/socialize:base-model';

export const BlocksCollection = new Mongo.Collection('blocks');

export class Block extends BaseModel{
    constructor(document){
        super(document);
    }
    isDuplicate() {
        return !!BlocksCollection.findOne({userId:this.userId, blockedUserId:this.blockedUserId});
    }
}

Block.attachCollection(BlocksCollection);

//Create the schema for a Block
Block.appendSchema({
    "userId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(this.isInsert){
                return this.userId;
            }
        },
        index: 1,
        denyUpdate:true
    },
    "blockedUserId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        index: 1,
        denyUpdate: true
    },
    "date":{
        type:Date,
        autoValue:function() {
            if(this.isInsert){
                return new Date();
            }
        },
        index: -1,
        denyUpdate:true
    }
});
