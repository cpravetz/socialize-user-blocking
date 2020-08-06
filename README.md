# User Blocking

This package enables users to block other users. This is useful when one user wants to stop unwanted communication from another user.

>This is a [Meteor][meteor] package with part of it's code published as a companion NPM package made to work with React Native. This allows your Meteor and React Native projects that use this package to share code between them to give you a competitive advantage when bringing your mobile and web application to market.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->
- [Supporting The Project](#supporting-the-project)
- [Meteor Installation](#meteor-installation)
- [React Native Installation](#react-native-installation)
- [Basic Usage](#basic-usage)
- [Scalability - Redis Oplog](#scalability---redis-oplog)
<!-- /TOC -->

## Supporting The Project

Finding the time to maintain FOSS projects can be quite difficult. I am myself responsible for over 30 personal projects across 2 platforms, as well as Multiple others maintained by the [Meteor Community Packages](https://github.com/meteor-community-packages) organization. Therfore, if you appreciate my work, I ask that you either sponsor my work through GitHub, or donate via Paypal or Patreon. Every dollar helps give cause for spending my free time fielding issues, feature requests, pull requests and releasing updates. Info can be found in the "Sponsor this project" section of the [GitHub Repo](https://github.com/copleykj/socialize-user-blocking)

## Meteor Installation

This package relies on the npm package `simpl-schema`, so when using with meteor you will need to make sure it is installed as well.

```shell
meteor npm install --save simpl-schema
meteor install socialize:user-blocking
```

## React Native Installation

When using this package with React Native, the dependency tree ensures that `simpl-schema` is loaded so there's no need to install it as when using within Meteor.

```shell
npm install --save @socialize/user-blocking
```

> **Note**
>
> When using with React Native, you'll need to connect to a server which hosts the server side Meteor code for your app using `Meteor.connect` as per the [@socialize/react-native-meteor](https://www.npmjs.com/package/@socialize/react-native-meteor#example-usage) documentation.

## Basic Usage

First we need to import the necessary classes for the environment we are in.

```javascript
// Meteor Imports
import { User } from 'meteor/socialize:user-model';
```

```javascript
// React Native Imports
// In React Native code  we need to import the user-blocking package so that it extends the user class
import '@socialize/user-blocking';
import { User } from '@socialize/user-model'
```

```javascript
//create a blocking rule for a dating website that blocks members of unwanted genders
User.registerBlockingHook(function(user){
    if(currentUser.blockUnsoughtGenders && !currentUsers.gendersSought.includes(user.gender) > 10){
        return true;
    }
});

Meteor.users.findOne({username:'EvilUser'}).block();

Meteor.users.findOne({username:'AlreadyBlockedUser'}).unblock();

const someUser = Meteor.users.findOne({username:'randomUser'});

Meteor.user().blocksUser(someUser); // => false
```

For a more in depth explanation of how to use this package see [API.md](api)

## Scalability - Redis Oplog

This package implements [cultofcoders:redis-oplog][redis-oplog]'s namespaces to provide reactive scalability as an alternative to Meteor's `livedata`. Use of redis-oplog is not required and will not engage until you install the [cultofcoders:redis-oplog][redis-oplog] package and configure it.

[redis-oplog]:https://github.com/cultofcoders/redis-oplog
[socialize]: https://atmospherejs.com/socialize
[meteor]: https://meteor.com
[api]: https://github.com/copleykj/socialize-user-blocking/blob/master/API.md
