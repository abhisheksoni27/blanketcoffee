Accounts.onCreateUser(function(options, user) {


    if (user.services.google !== null && user.services.google !== undefined) {
        console.log("Google")
        var email = user.services.google.email;

        var iat = email.indexOf("@");
        var uname = email.slice(0, iat);

        var imageurl = user.services.google.picture;

        options.profile.username = uname;
        options.profile.imgurl = imageurl;

    } else if (user.services.github !== null && user.services.github !== undefined) {
        console.log("Github");
        var uname = user.services.github.username;
        var accessToken = user.services.github.accessToken;
        var result = Meteor.http.get("https://api.github.com/user", {
            headers: {
                "User-Agent": "abhisheksoni27"
            },

            params: {
                access_token: accessToken
            }
        });
        var avatar = result.data.avatar_url;
        if (Meteor.users.find({
                "profile.username": uname
            }).fetch().length === 0) {
            options.profile.name = uname;
            options.profile.username = uname;
            options.profile.imgurl = avatar;
        } else {
            uname = uname + String(Math.random() * 100);
            options.profile.username = uname;
            options.profile.name = uname;
            options.profile.imgurl = avatar;
        }
    } else if (user.services.facebook !== null && user.services.facebook !== undefined) {
        console.log("Facebook")
        var email = user.services.facebook.email;

        var avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large"
        var iat = email.indexOf("@");
        var uname = email.slice(0, iat);
        if (Meteor.users.find({
                "profile.username": uname
            }).fetch().length === 0) {
            options.profile.name = user.services.facebook.name;
            options.profile.username = uname;
            options.profile.imgurl = avatar;
        } else {
            uname = uname + String(Math.random() * 100);
            options.profile.username = uname;
            options.profile.name = uname;
            options.profile.imgurl = avatar;
        }


    }

    if (options.profile) {
        user.profile = options.profile;
    }



    return user;
});
