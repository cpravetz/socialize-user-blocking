import { BlocksCollection } from '../common/block-model';
import { User } from 'meteor/socialize:user-model';

//array to store functions that run when a user gets blocked
let onHooks = [];

/**
 * Register a function to run when a user is blocked
 * @param {Function} onHook A function which runs after a user has been blocked
 */
User.onBlocked = function(onHook) {
    if(_.isFunction(onHook)){
        //add the hook to the onHooks array
        onHooks.push(onHook);
    }
}

BlocksCollection.allow({
    insert: function (userId, block){
        if(block.checkOwnership()){
            if(!block.isDuplicate()){
                return true;
            }else{
                throw new Meteor.Error("ExistingBlock", "This user is already blocked by the current user");
            }
        }
    },
    remove: function (userId, block){
        return block.checkOwnership();
    }
});

BlocksCollection.after.insert(function(userId, document){
    _.all(onHooks, function (hook) {
        hook(userId, document.blockedUserId);
    });
});
