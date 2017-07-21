/* eslint-disable import/no-unresolved */
import { User } from 'meteor/socialize:user-model';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
/* eslint-enabled import/no-unresolved */

import { BlocksCollection } from '../common/block-model';

// array to store functions that run when a user gets blocked
const onHooks = [];

/**
 * Register a function to run when a user is blocked
 * @param {Function} onHook A function which runs after a user has been blocked
 */
User.onBlocked = function onBlocked(onHook) {
    if (_.isFunction(onHook)) {
        // add the hook to the onHooks array
        onHooks.push(onHook);
    }
};

BlocksCollection.allow({
    insert(userId, block) {
        if (block.checkOwnership()) {
            if (!block.isDuplicate()) {
                return true;
            }
            throw new Meteor.Error('ExistingBlock', 'This user is already blocked by the current user');
        }
        return false;
    },
    remove(userId, block) {
        return block.checkOwnership();
    },
});

BlocksCollection.after.insert(function afterInsert(userId, document) {
    _.all(onHooks, function allHooks(hook) {
        hook(userId, document.blockedUserId);
    });
});
