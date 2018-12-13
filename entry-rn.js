/* eslint-disable import/no-unresolved */
import Meteor, { Mongo } from '@socialize/react-native-meteor';
import { User } from '@socialize/user-model';
import { BaseModel } from '@socialize/base-model';
import { ServerTime } from '@socialize/server-time';
/* eslint-enable import/no-unresolved */

import extendUser from './common/user-extensions.js';
import construct from './common/block-model.js';

const { Block, BlocksCollection } = construct({ BaseModel, ServerTime, Mongo });
extendUser({ Meteor, User, Block, BlocksCollection });

export { Block, BlocksCollection };
