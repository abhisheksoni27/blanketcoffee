var describeit = "";
var desc = ""



formatSlug = function(value) {

    var formatted = value
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[-]+/g, '-')
        .replace(/[^\w\x80-\xFF-]+/g, '');

    if (Posts.find({
            slug: formatted
        }).fetch().length > 0) {

        var num = Numposts.find().fetch()[0].postnum;
        formatted = formatted + String(num);
        
        Meteor.call('changenumposts');
    }
    return formatted;
}





Template.writeapost.events({

    'click .nocursor': function() {
        if (Meteor.userId()) {
            Meteor.logout(function() {
                window.location = "//blanketcoffee.com/"
            });
        }

    }

});



Template.dashboard.events({

    'click .nocursor': function() {
        if (Meteor.userId()) {
            Meteor.logout(function() {
                window.location = "//blanketcoffee.com/"
            });
        }

    }

});


Template.body.rendered = function() {
    Template.myAtForm.replaces("atForm");
}



Template.postpage.helpers({
    exists: function() {

        if (Posts.find({
                slug: document.URL.split('/')[3]
            }).count() > 0) {
            return true;
        } else {
            return false;
        }
    },



    'uname': function() {








    }
});

Template.dashboard.helpers({
    posts: function() {
        return Posts.find({
            id: Meteor.userId()
        });
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
    $("textarea").val(bodypost);
}



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

Template.dashboard.helpers({
    'slug': function() {
        var toid = this._id;
        return Posts.findOne(toid).slug;


    }
})


Template.postpage.helpers({

    posts: function() {
        return Posts.find({});
    },

});

Template.blog.helpers({

    posts: function() {
        return Posts.find({});
    },

});


Template.material.helpers({

    posts: function() {
        return Posts.find({});
    },

});

Template.editor1.events({

    'click .publish': function(event, template) {
        event.preventDefault();

        var titleVar = $('.entry-title input').val();
        var testid = Meteor.userId();
        var nameu = Meteor.users.find(testid).fetch()[0].profile.username;
        var numberofposts = Posts.find({
            id: Meteor.userId()
        }).count();
        numberofposts = numberofposts + 1;



        var bodyVar = Session.get('editor-html');
        var bodymd = Session.get('editor-markdown');

        var imgtags = ""
        var ist = bodyVar.indexOf(' src=') + 5;
        var iend = bodyVar.indexOf('alt') - 2;
        if (ist !== 4 && iend !== -3) {
            imgtags = bodyVar.slice(ist, iend);
            console.log(imgtags);
        } else {
            imgtags = "https://placehold.it/250x250";
        }




        var converter = new showdown.Converter()
        var text = Session.get('editor-markdown');
        var converted = converter.makeHtml(text);
        var st = text.indexOf('//#description//') + 16;
        var end = text.indexOf('//description#//') - 16;
        if (st !== 15 && end !== -18) {
            desc = text.substr(st, end);

        } else {
            desc = bodymd.split(" ").slice(0, 30).join(" ");
        }



        var a1 = bodyVar.indexOf("<p>//#");
        var a2 = bodyVar.indexOf("#//</p>") + 7;
        var rem = bodyVar.substr(a1, a2);
        bodyVar = bodyVar.replace(rem, "");



        console.log(bodyVar);
        console.log(titleVar);
        var d = new Date();
        var d1 = String(d).split(" ").slice(1, 4).join(" ");




        if (titleVar !== null && bodyVar !== null) {

            console.log("Crossed");

            Posts.insert({
                name: Meteor.user().profile.name,
                id: Meteor.userId(),
                title: titleVar,
                body: bodyVar,
                nop: numberofposts,
                date: d1,
                md: bodymd,
                slug: formatSlug(titleVar),
                description: desc,
                img: imgtags,
                username: nameu



            });

            function currentslug() {
                console.log("window.location");
                var lastpost = Posts.find({
                    id: Meteor.userId()
                }).count();
                var clug = Posts.find({id:Meteor.userId()}).fetch()[lastpost - 1].slug
                window.location = "//blanketcoffee.com/" + clug;

            }
            currentslug();


        }

    }

});
