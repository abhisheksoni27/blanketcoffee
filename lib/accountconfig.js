AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    lowercaseUsername: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: false,
    showPlaceholders: true,
    showResendVerificationEmailLink: true,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Texts
    texts: {
        button: {
            signUp: "Caffieneate Now!"
        },

        title: {
            forgotPwd: "Recover Your Caffiene"
        },
    },
});


AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'login',
    
    redirect: '/dashboard',
});


Router.plugin('ensureSignedIn', {
    only: [ 'dashboard', 'writeapost', 'editpost']
});





AccountsTemplates.configure({
    texts: {
        errors: {

            loginForbidden: "Invalid UserName or PassCode",
            mustBeLoggedIn: "You must be logged in.",
            pwdMismatch: "error.pwdsDontMatch",
            validationErrors: "Validation Errors",
            verifyEmailFirst: "Verifying your email helps us identify you as a genuine user. Please verify your email first.",
        }
    }
});


AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
   minLength:5,
    placeholder: {
        signUp: "Who are you?"
    },
    required: true
});


if (Meteor.isServer) {
    Meteor.methods({
        "userExists": function(username) {
            return !!Meteor.users.findOne({
                username: username
            });
        },
    });
}



AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    placeholder: {
        signUp: "Please pick a unique username.",
    },
    minLength: 6,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    maxLength: 15,
    required: true,
    func: function(value) {
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists) {
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError("This username is already taken.");
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },





});
