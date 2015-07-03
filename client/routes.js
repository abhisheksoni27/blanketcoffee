Router.configure({
    loadingTemplate: 'loading',

    layoutTemplate: 'layout'
});

Router.route('/', function() {
    this.render('home');
});


Router.route('/writeapost');
Router.route('/dashboard');
Router.route('/postslist');
Router.map(function() {

    this.route('editpost', {

        path: '/:_id/editpost',
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });
});



Router.route('/:slug', {
    name: 'postpage',
    data: function() {
        var data = Posts.findOne({
            'slug': this.params.slug
        });
        return data;
    }
});
