var describeit = "";
formatSlug = function(value) {
    var formatted = value
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[-]+/g, '-')
        .replace(/[^\w\x80-\xFF-]+/g, '');
    return formatted;
}

Template.writeapost.events({

    'click .nocursor': function() {
        if (Meteor.userId()) {
            Meteor.logout(function() {
                window.location = "//localhost:3000/"
            });
        }

    }

});

Template.writeapost.helpers({
    name: function() {
        return Meteor.user().profile.name;
    }

});
Template.editor1.helpers({
    name: function() {
        return Meteor.user().profile.name;
    }

});

Template.editor1.events({

    'click .publish': function() {
        Session.get('editor-html');


    }

});
Template.postslist.helpers({

    posts: function() {
        return Posts.find({});
    }
});

Template.postpage.helpers({

    posts: function() {
        return Posts.find({});
    },

});




Template.editor1.events({

    'click .publish': function(event, template) {
        event.preventDefault();

        var titleVar = $('.entry-title input').val();



        var bodyVar = Session.get('editor-html');


        console.log(bodyVar);
        console.log(titleVar);




        if (titleVar !== null && bodyVar !== null) {

            console.log("Crossed");

            console.log("Okay google");

            




            Posts.insert({
                name: Meteor.user().profile.name,
                id: Meteor.userId(),
                email: Meteor.user().services.google.email,
                image: Meteor.user().services.google.picture,
                title: titleVar,
                body: bodyVar,

                date: new Date(),

                slug: formatSlug(titleVar)



            });



        } else {
            $("body").append("<p>You cannot post more than once.</p>");




        }

    }
});
