  Meteor.startup(function() {

    if(Meteor.isClient)


      Router.configure({
          loadingTemplate: 'loading',

          layoutTemplate: 'layout'
      });

      Router.route('/', function() {
          this.render('home')
      });


      Router.route('/competitions');


      Router.route('/loading');

      Router.route('/faq',{
        name: 'faq',
          loadingTemplate: 'loading',
        });

       Router.route('/blogfaq',{
        name: 'blogfaq',
          loadingTemplate: 'loading',
        });



      Router.route('/owners');
      Router.route('/howtomarkdown');


      Router.route('/owners/madhavi');


      Router.route('/owners/abhishek');


      Router.route('/owners/deeksha');
      Router.route('/writeapost',{
        name:'writeapost',
        loadingTemplate:'loading'
      });
      Router.route('/dashboard');
      Router.route('/blog',{
        name:'blog',
        waitOn:function(){return Meteor.subscribe('posts');},
         fastRender: true,
        loadingTemplate:'loading'
      });
      Router.map(function() {

          this.route('editpost', {

              path: '/:_id/editpost',
              data: function() {
                  return Posts.findOne(this.params._id);
              }
          });
      });





      Router.route('/user/:username', {
          name: 'profile',
          loadingTemplate: 'loading',
          waitOn: function() {
              Meteor.subscribe('users');
          },
           fastRender: true,
          data: function() {

              console.log(this.params.slug);
              return Meteor.users.find({
                  'profile.username': this.params.username
              });



          }
      });




      Router.route('/:slug', {
          name: 'postpage',
          loadingTemplate: 'loading',
          waitOn: function() {
              return Meteor.subscribe('posts', this.params._id)
          },
           fastRender: true,
          data: function() {
              var data = Posts.findOne({
                  'slug': this.params.slug
              });
              return data;
          }
      });


  });
