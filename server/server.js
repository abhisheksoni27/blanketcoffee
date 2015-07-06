Meteor.methods({
	changenumposts:function(){
		var change = Numposts.find().fetch()[0].postnum +1;
		var changeid = Numposts.find().fetch()[0]._id;
		Numposts.update(changeid,{$set: {postnum:change}});
	}
})