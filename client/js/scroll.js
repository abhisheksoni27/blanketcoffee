Template.hd.rendered = function() {
  var flag = 0;
    var first = 1;
     
        window.onscroll = function(e) {
            // called when the window is scrolled.




            if (flag === 0 && first === 1) {
                $(".hide").attr("class", "navbar-fixed");
                console.log($(window).width());

                $(".button-collapse").sideNav();

                flag = 1;
                first = 0;
            } else {


                if ($(window).scrollTop() === 0 && first !== 1) {

                    var cl = "navbar-fixed";
                    $("." + cl).attr("class", cl + " " + "hide").fadeIn(1300);
                    console.log($("." + cl) + cl + "'s class has been changed to hide");
                    flag = 0;
                    first = 1;
                }
            }
        }
    }