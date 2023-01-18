/*====================================
        Button Trigger Translate
======================================*/
var option;
function triggerTranslate(){
    if(option == null){
        option = $('.skiptranslate').contents().find(".text:eq(1)");
    }
    // console.log(option.text());
    option.click();
}

/*====================================
        Lab Member Switching
======================================*/
function switchLabMember() {
    // Set lightbox_team isotope
    var $container_team = $('#lightbox_team');
    $container_team.isotope({
        filter: '.111',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });

    $("img.111").trigger("lazylazy");

    // When Change team year
    $('#teamYear').change(function(){
        var year = $(this).val();
        console.log('year -> ' + year);

        $container_team.isotope({
            filter: year,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $("img" + year).trigger("lazylazy");

        return false;
    });
}

/*====================================
        Lab Equipment Switching
======================================*/
function switchLabEquipments() {
    var $container = $('#lightbox');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });

    $('.cat a').click(function() {
        $('.cat .active').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
}

function mainFunction() {
    (function () {
       'use strict';
    
        /*==============================================
        Testimonial Slider
        =============================================== */
        $('a.page-scroll').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 40
                    }, 900);
                    return false;
                }
            }
        });
    
        /*====================================
        Show Menu on Book
        ======================================*/
        $(window).bind('scroll', function() {
            var navHeight = $(window).height() - 100;
            if ($(window).scrollTop() > navHeight) {
                $('.navbar-default').addClass('on');
            } else {
                $('.navbar-default').removeClass('on');
            }
        });
    
        $('body').scrollspy({
            target: '.navbar-default',
            offset: 80
        })
    
        $(document).ready(function() {
            $("#team").owlCarousel({
    
                navigation : false, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                autoHeight : true,
                itemsCustom : [
                            [0, 1],
                            [450, 2],
                            [600, 2],
                            [700, 2],
                            [1000, 4],
                            [1200, 4],
                            [1400, 4],
                            [1600, 4]
                          ],
            });
    
            $("#clients").owlCarousel({
    
                navigation : false, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                autoHeight : true,
                itemsCustom : [
                            [0, 1],
                            [450, 2],
                            [600, 2],
                            [700, 2],
                            [1000, 4],
                            [1200, 5],
                            [1400, 5],
                            [1600, 5]
                          ],
            });
    
            $("#testimonial").owlCarousel({
                navigation : false, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
    
            $("#plan").owlCarousel({
                navigation : false, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });

            /* GroupMeeting DataTable */
            $('#table_GroupMeeting').DataTable({
                ordering: false,
                autoWidth: false
            });

            /* Images Lazy */
            $("img.team-img").lazyload({
                effect: "fadeIn",
                event: "lazylazy"
            });
        });
    
        /*====================================
        Portfolio Isotope Filter
        ======================================*/
        $(window).load(function() {
            switchLabMember();
            switchLabEquipments();
        });
    }());
}
mainFunction();