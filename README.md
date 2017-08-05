# User Blocking #

This package enables users to block other users. This is useful when one user wants to stop unwanted communication from another user.

## Supporting the Project ##
In the spirit of keeping this and all of the packages in the [Socialize](https://atmospherejs.com/socialize) set alive, I ask that if you find this package useful, please donate to it's development.

[Bitcoin](https://www.coinbase.com/checkouts/4a52f56a76e565c552b6ecf118461287) / [Patreon](https://www.patreon.com/user?u=4866588) / [Paypal](https://www.paypal.me/copleykj)

## Installation ##

```shell
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
