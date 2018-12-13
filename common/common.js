/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { User } from 'meteor/socialize:user-model';
import { BaseModel } from 'meteor/socialize:base-model';
import { ServerTime } from 'meteor/socialize:server-time';
import { Mongo } from 'meteor/mongo';
/* eslint-enable import/no-unresolved */

import extendUser from './user-extensions.js';
import construct from './block-model.js';

const { Block, BlocksCollection } = construct({ BaseModel, ServerTime, Mongo });
extendUser({ Meteor, User, Block, BlocksCollection });

export { Block, BlocksCollection };
