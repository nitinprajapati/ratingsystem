Meteor.startup(function () {
 // code to run on server at startup
    Meteor.users.allow({
      update: function (userId, doc) {
        return true;
      }
    });
});