Template.home.rendered = function() {
    $("#demo01").animatedModal({
        animatedIn: 'zoomIn',
        animatedOut: 'bounceOut',
        color: '#e53935'
    });

    window.sr = new scrollReveal();


    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f) {
        setTimeout(f, 1000 / 60)
    }

    var bubble1 = document.getElementById('large-header');
    var bubble2 = document.getElementById('titlename');

    function parallaxbubbles() {
        var scrolltop = window.pageYOffset; // get number of pixels document has scrolled vertically 
        bubble1.style.top = -scrolltop * 0.1 + 'px' // move bubble1 at 20% of scroll rate
        bubble2.style.top = -scrolltop * 0.9 + 'px' // move bubble2 at 50% of scroll rate
    }

    window.addEventListener('scroll', function() { // on page scroll
        requestAnimationFrame(parallaxbubbles) // call parallaxbubbles() on next available screen paint
    }, false)

}


Template.openjournal.rendered = function() {

    $(function() {
        $("#slider1").responsiveSlides({

        });
        $("#slider2").responsiveSlides({

        });
    });
}
