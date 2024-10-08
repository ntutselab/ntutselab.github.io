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
    const observer = lozad('.team-img'); // lazy loads elements with default selector as '.team-img'
    const observer_group_photo = lozad('.group-photo'); // lazy loads elements with default selector as '.group-photo'
    $container_team.isotope({
        filter: '.113',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });

    $('img.113').each(function() {
        observer.triggerLoad(this);
    });

    $('img.group_photo').each(function() {
        observer_group_photo.triggerLoad(this);
    });

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

        const selector = year === '*' ? '.team-img' : 'img' + year;
        $(selector).each(function() {
            observer.triggerLoad(this);
        });
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
            /* Lab Group Photo */
            $.getJSON('./data/group_photos.json', function(data) {
                const language = $('html')[0].lang;
                
                let initString = "";
                $.each( data, function( key, val ) {
                    const title = language === 'zh' ? val.title_tw : val.title;
                    initString += `
                        <div class=\"gp_container\">
                            <img data-src=\"${val.photo}\" loading=\"lazy\" class=\"img-responsive group_photo\" alt=\"${title}\">
                            <h4 class=\"gp_text\">${title}</h4>
                        </div>
                    `;
                });
                $('#group_photo').append(initString);
                $("#group_photo").owlCarousel({
                    navigation : false, // Show next and prev buttons
                    slideSpeed : 300,
                    paginationSpeed : 400,
                    autoPlay : 2000,
                    autoHeight : true,
                    lazyLoad : true,
                    itemsCustom : [
                        [0, 1],
                        [450, 1],
                        [600, 1],
                        [700, 1],
                        [1000, 2],
                        [1200, 2],
                        [1400, 3],
                        [1600, 3]
                      ],
                });
            });

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
            // $('#table_GroupMeeting').DataTable({
            //     ordering: false,
            //     autoWidth: false
            // });
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