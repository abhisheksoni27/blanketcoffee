if (Meteor.isClient) {
	console
    Meteor.subscribe('faq');
   
    Meteor.subscribe('posts');
    Meteor.subscribe('numposts');
}
