# User Blocking #

This package enables users to block other users. This is useful when one user wants to stop unwanted communication from another user.

## Supporting the Project ##
In the spirit of keeping this and all of the packages in the [Socialize](https://atmospherejs.com/socialize) set alive, I ask that if you find this package useful, please donate to it's development.

[Bitcoin](https://www.coinbase.com/checkouts/4a52f56a76e565c552b6ecf118461287) / [Patreon](https://www.patreon.com/user?u=4866588) / [Paypal](https://www.paypal.me/copleykj)

## Installation ##

This package relies on the npm package `simpl-schema` so you will need to make sure it is installed as well.

```shell
$ meteor npm install --save simpl-schema
$ meteor install socialize:user-blocking
```

## Basic Usage ##

```javascript
Meteor.users.findOne({username:'EvilUser'}).block();

Meteor.users.findOne({username:'AlreadyBlockedUser'}).unblock();

const someUser = Meteor.users.findOne({username:'randomUser'});

Meteor.user().blocksUser(someUser); // => false

//create a blocking rule for a dating website that blocks members of unwanted genders
User.registerBlockingHook(function(user){
    if(currentUser.blockUnsoughtGenders && !currentUsers.gendersSought.includes(user.gender) > 10){
        return true;
    }
});
```

For a more in depth explanation of how to use this package see [API.md](API.md)

## Scalability - Redis Oplog ##

This package contains a preliminary implementation of [cultofcoders:redis-oplog][1]'s namespaces to provide reactive scalability as an alternative to Meteor's `livedata`. Use of redis-oplog is not required and will not engage until you install the [cultofcoders:redis-oplog][1] package and configure it.

Due to the preliminary nature of this implementation, you may run into minor issues. Please report any issues you find to GitHub so that they can be fixed.

[1]:https://github.com/cultofcoders/redis-oplog
