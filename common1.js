Posts=new Mongo.Collection('posts');
Faq=new Mongo.Collection('faq');
Numposts=new Mongo.Collection('numposts');



if(Meteor.isServer){
	Posts.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.id === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.id === userId;
  },
  fetch: ['id']
});
}

