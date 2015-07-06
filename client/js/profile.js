Template.profile.helpers({
    'namespace': function() {

        var currentusername = document.URL.split("/")[4];
        if (Meteor.users.find({
                "profile.username": currentusername
            }).fetch()[0].profile.username == currentusername) {
            var namesent = Meteor.users.find({
                "profile.username": currentusername
            }).fetch()[0].profile.name;
        }
        return namesent;
    },

    'profimg': function() {
        var currentusername = document.URL.split("/")[4];
        if (Meteor.users.find({
                "profile.username": currentusername
            }).fetch()[0].profile.username == currentusername) {
            var namesent1 = Meteor.users.find({
                "profile.username": currentusername
            }).fetch()[0].profile.imgurl;
        }
        return namesent1;
    },
    
    'existinguser': function() {
    

        if (Meteor.users.find({
                "profile.username": document.URL.split('/')[4]
            }).count() > 0) {
            return true;
        } else {
            return false;
        }
    

    },
    'posts': function() {
        var currentusername = document.URL.split("/")[4];
        return Posts.find({
            username: currentusername
        });


    }


})
