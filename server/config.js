if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
        Accounts.loginServiceConfiguration.remove({
            service: "google"
        })
        Accounts.loginServiceConfiguration.insert({
            service: "google",
            clientId: "780200840080-bk5rt6vv1rv9g7qcn73rq4prg5i72gfk.apps.googleusercontent.com",
            secret: "artwDZcxX4wgfPI2_x41-9xN"
        });
        Accounts.loginServiceConfiguration.remove({
            service: "github"
        })
        Accounts.loginServiceConfiguration.insert({
            service: "github",
            clientId: "30996f8f7924b020f8f1",
            secret: "f8f1cbf2091d1ccfcbd8dddc378c91a4a0c66e5b",
            requestPermission:'avatar_url'
        });
        Accounts.loginServiceConfiguration.remove({
            service: "twitter"
        })
        Accounts.loginServiceConfiguration.insert({
            service: "twitter",
            clientId: "",
            secret: ""
        });
        Accounts.loginServiceConfiguration.remove({
            service: "facebook"
        })
        Accounts.loginServiceConfiguration.insert({
            service: "facebook",
            appId: "840135266035584",
            secret: "9d4cbaba3708c09c2dceca21d34f07f8"
        });

        
    });
}
