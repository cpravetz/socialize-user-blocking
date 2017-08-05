## User Extensions ##
This package extends the [socialize:user-model](https://github.com/copleykj/socialize-user-model) package with properties and methods that apply the the user in the context of friends and friend requests.

### Instance Methods ###

**block** - block a user.

```javascript
Template.userProfile.events({
    'click [data-action=block]': function() {
        //assumes context is a instance of a user
        this.block();
    }
});
```
**unblock** - unblock a user.

```javascript
Template.userProfile.events({
    'click [data-action=unblock]': function() {
        //assumes context is a instance of a user
        this.unblock();
    }
});
```
**blocksUser(user)** - Check if one user blocks another. Check include by \_id by default. Other blocking checks can be registered using `User.registerBlockingHook`.

```html
<!-- assuming data context is user instance -->
{{#if currentUser.blocksUser this}}
    <div class="btn danger" data-action="unblock">Unblock</div>
{{/if}}
```

**blockedByUserIds(limit, skip)** - Get array of userId's for users that currently block the user.

```javascript
var ids = currentUser.blockedByUserIds();

//return only users that aren't blocking the currentUser
return Meteor.users.find({_id:{$nin:ids}});
```

**blockedByUsers(limit, skip)** - Get a cursor of users that currently block the user.

```javascript
var blockedByUsers = currentUser.blockedByUsers()
```

**blockedUserIds(limit, skip)** - Get an array of userIds for users that are blocked by the the user.

```javascript
var ids = currentUser.blockedUserIds();

//return only users that the current user isn't blocking
return Meteor.users.find({_id:{$nin:ids}});
```

**blockedUsers(limit, skip)** - Get a cursor of users that are blocked by the user

```html
{{#each currentUser.blockedUsers}}
    <div class="btn danger" data-action="unblock">Unblock {{username}}</div>
{{/each}}
```

### Static Methods ###

**User.registerBlockingHook(hookFunction)** - Register a function that when returns true signifies that a user is blocked. Hook function is passed a User instance to check against and the context is the calling user instance.

```javascript
//create a blocking rule that allows users to preemptively block others that may be a nuisance
User.registerBlockingHook(function(user){
    if(currentUser.blockAnnoyingUsers && user.flaggedCount > 10){
        return true;
    }
});
```