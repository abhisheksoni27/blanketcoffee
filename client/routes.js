Router.configure({
    loadingTemplate: 'loading',

    layoutTemplate: 'layout'
});

Router.route('/', function() {
    this.render('home');
});

Router.route('/writeapost');

Router.route('/:slug', {
    name: 'postpage',
    data: function() {
        return Posts.findOne({
            'slug': this.params.slug
        });
    }
});
