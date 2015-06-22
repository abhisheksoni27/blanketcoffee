if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
        Accounts.loginServiceConfiguration.remove({
        	service:"google"
        })
        Accounts.loginServiceConfiguration.insert({
            service: "google",
            clientId: "780200840080-bk5rt6vv1rv9g7qcn73rq4prg5i72gfk.apps.googleusercontent.com",
            secret: "artwDZcxX4wgfPI2_x41-9xN"
        });
    });
}
