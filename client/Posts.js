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


Template.body.rendered=function(){
    Template.myAtForm.replaces("atForm");
}



Template.postpage.helpers({
exists:function(){

    if(Posts.find({slug:document.URL.split('/')[3]}).count() > 0)
        {return true;}
    else{return false;}
}
});

Template.dashboard.helpers({
    posts: function() {
        return Posts.find({});
    }

})

Template.dashboard.events({
    'click .fa-close': function() {
        if (confirm("Are you sure")) {
            Posts.remove(this._id)
        }

    }
});

Template.editpost.rendered = function() {
    var agn = document.URL.split('/')[3];
    var bodypost = Posts.find({
        _id: agn
    }).fetch()[0].md;
    $("pre span").text(bodypost);
}


Template.editpost.events({
    'click .publish1': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            title: $('.entry-title input').val(),
            body: Session.get('editor-html')
        }

        Posts.update(currentPostId, {
            $set: postProperties
        }, function(error) {
            if (error) {
                // display the error to the user
                console.log(error.reason);
            } else {
                Router.go('/dashboard', {
                    slug: Posts.find(currentPostId).slug
                });
            }
        });
    }
});



Template.dashboard.rendered = function() {
    window.onload = function() {

        function windowH() {
            var wH = $(window).height();

            $('.bluegray').css({
                height: wH
            });

            $('.blue').css({
                height: wH
            });
        }

        windowH();

    }

}

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
        var numberofposts = Posts.find({
            id: Meteor.userId()
        }).count();
        numberofposts = numberofposts + 1;



        var bodyVar = Session.get('editor-html');
        var bodymd = Session.get('editor-markdown');

        var describeit = bodymd.split(" ").slice(0,30).join(" ");



        console.log(bodyVar);
        console.log(titleVar);
        var d = new Date();
        var d1 = String(d).split(" ").slice(1,4).join(" ");




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
                nop: numberofposts,
                date: d1,
                md: bodymd,
                slug: formatSlug(titleVar),
                description:describeit



            });

            function currentslug() {
                console.log("window.location");
                var lastpost = Posts.find({
                    id: Meteor.userId()
                }).count();
                var clug = Posts.find().fetch()[lastpost - 1].slug;
                window.location = "//localhost:3000/" + clug;

            }
            currentslug();


        } else {
            $("body").append("<p>You cannot post more than once.</p>");




        }

    }
});
