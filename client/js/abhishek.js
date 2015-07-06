Template.ownersAbhishek.rendered = function() {
    setTimeout(function() {

        $(document).on('click', '.padd', function(event) {
            event.preventDefault();
            var target = "#" + this.getAttribute('data-target');
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);
        });



    }, 500)


}


Template.ownersDeeksha.rendered = function() {
    setTimeout(function() {

        $(document).on('click', '.padd', function(event) {
            event.preventDefault();
            var target = "#" + this.getAttribute('data-target');
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);
        });



    }, 500)


}


Template.ownersMadhavi.rendered = function() {
    setTimeout(function() {

        $(document).on('click', '.padd', function(event) {
            event.preventDefault();
            var target = "#" + this.getAttribute('data-target');
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);
        });



    }, 500)


}
