var describeit = "";
Template.postslist.helpers({

    posts: function() {
        return Posts.find({});
    }
});

Template.writepost.events({

    'submit .new-post': function(event, template) {
        event.preventDefault();

        var titleVar = template.find('.title').value;
        template.find('.title').value = "";

        var bodyVar = template.find('.body').value;
        template.find('.body').value = "";

        var describe = bodyVar.split(" ");

        var haspost = Posts.findOne({
            id: Meteor.userId()
        });
        if (haspost === null || haspost === undefined) {
            hasposted = Math.random();
            console.log("Crossed1");
        } else {
            hasposted = 1;
            console.log("Crossed2");
        }


        for (var i = 0; i <= describe.length - 100 * (Math.random() / describe.length); i++) {
            describeit += "" + describe[i];
        }




        if (titleVar !== null && bodyVar !== null) {

            console.log("Crossed");

            if (hasposted !== 1) {


                Posts.insert({
                    name: Meteor.user().profile.name,
                    id: Meteor.userId(),
                    email: Meteor.user().services.google.email,
                    image: Meteor.user().services.google.picture,
                    title: titleVar,
                    body: bodyVar,
                    description: describeit,
                    date: new Date(),
                    votes: 0,
                    hasvotedon: [],
                    posted: 1



                });
            } else {

                alert("You have already Posted.");


            }

        }


    }
})
