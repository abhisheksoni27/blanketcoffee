/*Template.enterusername.helpers({
    'userredirect': function() {

        if (Meteor.users.find(Meteor.userId()).fetch()[0].username == null) {
            return true
        } else {
            window.location = "//blanketcoffee.com/user/" + Meteor.users.find(Meteor.userId()).fetch()[0].username;
        }



    }
});


Template.enterusername.events({

'click #usernamesubmit':function(){
	var uname = $('#username').val();
     var ticket = Meteor.users.findOne({Meteor.userId()});

 if(ticket){
    Meteor.users.update(ticket, {
                        $set: {"profile.username":uname}
                    });
 }

window.location="https://google.com";

}


})

*/
