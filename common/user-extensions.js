/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { User } from 'meteor/socialize:user-model';
/* eslint-enable import/no-unresolved */

import { Block, BlocksCollection } from './block-model.js';

// Array to store additional blocking check functions
const blockHooks = [];

/**
 * Register a new function that if returns true signifies that a user is blocked
 * @param {Function} hook A function which returns true if the user should be considered blocked
 */
User.registerBlockingHook = function registerBlockingHook(hook) {
    if (_.isFunction(hook)) {
        // add the hook to the blockHooks array
        blockHooks.push(hook);
    }
};

User.methods({
    /**
     * Check if the user blocks another by running checks which
     * have been registered with User.registerBlockingHook()
     * @param   {Object}  [user=Meteor.user()] The user instance to check
     * @returns {Boolean} Whether or not the user is blocked
     */
    blocksUser(user = Meteor.user()) {
        const self = this;
        let blocked = false;

        if (!this.isSelf(user) && !this.isFriendsWith(user._id)) {
            _.all(blockHooks, function allHooks(hook) {
                if (hook.call(self, user)) {
                    blocked = true;
                }
            });
        }
        return blocked;
    },

    /**
     * Check if user blocks another by thier _id
     * @param   {Object}  user The User instance to check against
     * @returns {Boolean} Whether the user is blocked or not
     */
    blocksUserById(user) {
        return !!BlocksCollection.findOne({ userId: this._id, blockedUserId: user._id });
    },

    /**
     * Block a user by their _id
     */
    block() {
        new Block({ blockedUserId: this._id }).save({
            channels: [
                `blocked::${Meteor.userId()}`,
                `blockedBy::${this._id}`,
            ],
        });
    },

    /**
     * Unblock a user that was previously blocked by their _id
     */
    unblock() {
        // find then remove because you must remove records by _id on client
        const block = BlocksCollection.findOne({ userId: Meteor.userId(), blockedUserId: this._id });
        block && block.remove({
            channels: [
                `blocks::${Meteor.userId()}`,
                `blockedBys::${this._id}`,
            ],
        });
    },

    /**
     * Get a cursor of Block instances for users that this user blocks
     * @param  {Object} [options={}] Mongo style options object which is passed to Collection.find()
     * @returns {Mongo.Cursor} A cursor which when iterated over returns Block instances
     */
    blocks(options = {}) {
        const newOptions = {
            ...options,
            channel: `blocks::${Meteor.userId()}`,
        };
        return BlocksCollection.find({ blockedUserId: this._id }, newOptions);
    },

    /**
     * Get a cursor of Block instances for other users that block this user.
     * @param  {Object} [options={}] Mongo style options object which is passed to Collection.find()
     * @returns {Mongo.Cursor} A cursor which when iterated over returns Block instances
     */
    blockedBys(options = {}) {
        const newOptions = {
            ...options,
            channel: `blockedBys::${this._id}`,
        };
        return BlocksCollection.find({ userId: this._id }, newOptions);
    },

    /**
     * Get a list of userIds who are blocking the user
     * @param  {Object} [options={}] Mongo style options object which is passed to Collection.find()
     * @returns {Array} Array of userIds for users that block this user
     */
    blockedByUserIds(options = {}) {
        return this.blockedBys(options).map(block => block.userId);
    },

    /**
     * Get a cursor of User instances who are blocking the user
     * @param  {Object} [options={}] Mongo style options object which is passed to Collection.find()
     * @returns {Mongo.Cursor} A cursor which when iterated over returns User instances
     */
    blockedByUsers(options = {}) {
        const ids = this.blockedByUserIds(options);
        return Meteor.users.find({ _id: { $in: ids } });
    },

    /**
     * Get a list of userIds that the user blocks
     * @param  {Object} [options={}] Mongo style options object which is passed to Collection.find()
     * @returns {Array} Array of userIds for users that this user blocks
     */
    blockedUserIds(options = {}) {
        return this.blocks(options).map(block => block.blockedUserId);
    },

    /**
     * Get a cursor of User instances that the user is blocking
     * @param  {Object} [options={}] Mongo style options object which is passed to Collection.find()
     * @returns {Mongo.Cursor} A cursor which when iterated over returns User instances
     */
    blockedUsers(options = {}) {
        const ids = this.blockedUserIds(options);
        return Meteor.users.find({ _id: { $in: ids } });
    },

});

// Register a hook to check if the user block another by _id field
User.registerBlockingHook(function blocksUserById(user) {
    return this.blocksUserById(user);
});
