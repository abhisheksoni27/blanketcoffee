if (Meteor.isServer) {
    Meteor.publish('faq', function() {
        return Faq.find({});
    });

    Meteor.publish('posts', function() {
        return Posts.find({});
    });
    Meteor.publish('numposts', function() {
        return Numposts.find({});
    });
}
