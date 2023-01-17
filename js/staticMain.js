var language = $('html')[0].lang;

/*====================================
            按鈕觸發翻譯
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
            研究計畫讀取
======================================*/
function readResearchPlan() {
    $.getJSON('./data/projects.json', function(data) {
        var initString = "<div class=\"item\"><table class=\"table\"><thead><tr><th scope=\"col\">年度</th><th scope=\"col\">單位</th><th scope=\"col\">計畫名稱</th></tr></thead><tbody>";
        var items_count = 1;
        data.forEach(element => {
            if(items_count > 10){
                initString += "</tbody></table></div>";
                initString += "<div class=\"item\"><table class=\"table\"><thead><tr><th scope=\"col\">年度</th><th scope=\"col\">單位</th><th scope=\"col\">計畫名稱</th></tr></thead><tbody>";
                items_count = 1;
            }

            initString += `
            <tr>
                <td>${element.year}</td>
                <td>${language == 'zh' ? element.funding_agency : element.funding_agency_en}</td>
                <td class=\"td_title\">${language == 'zh' ? element.project_name : element.project_name_en}</td>
            </tr>
            `;
            items_count += 1;
        });
        initString += "</tbody></table></div>";
        $('#plan').append(initString);
    });
}

/*====================================
            實驗室成員讀取
======================================*/
function readLabMember() {
    $.getJSON('./data/members.json', function(data) {
        var initString = "";
        $.each( data, function( key, val ) {
            let photo = val.photo + "-A.png";
            if(val.photo == 'none'){
                photo = 'none_w.png';
            }

            let paper = `<a href=\"${val.url}\" target=\"blank\">${language == 'zh' ? val.paper : val.paper_en}</a>`;
            if(val.paper == '未定'){
                paper = language == 'zh' ? '未定' : 'undecided';
            }

            initString += `
            <div class=\"col-xs-6 col-sm-6 col-md-3 col-lg-3 ${val.year} isotope-item\">
                <div class=\"portfolio-item\">
                    <div class=\"hover-bg\">
                        <img data-original=\"image/mugshot/${photo}\" alt=\"...\" class=\"img-circle team-img ${val.year}\">
                        <div class=\"caption\">
                            <h3>${language == 'zh' ? val.name : val.englishName}</h3>
                            <p>${val.year} ${language == 'zh' ? '級' : 'Year'}</p>
                            <p class=\"p_paper\">論文 : </p>
                            <p class=\"p_paper\">${paper}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
        $('#lightbox_team').append(initString);
    });
}

/*====================================
            實驗室成員切換
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
            實驗室設備讀取
======================================*/
function readLabEquipments() {
    $.getJSON('./data/equipments.json', function(data) {
        var initString = "";
        $.each( data, function( key, value ) {
            initString += `
            <div class=\"col-sm-6 col-md-3 col-lg-3 ${value.type} isotope-item \">
                <div class=\"portfolio-item\">
                    <div class=\"hover-bg\">
                        <a href=\"#\">
                            <div class=\"hover-text\">
                                <h4>${value.name}</h4>
                                <div class=\"clearfix\"></div>
                            </div>
                            <img src=\"${value.photo}\" class=\"img-responsive\" alt=\"...\">
                        </a>
                    </div>
                </div>
            </div>
            `;
        });
        $('#lightbox').append(initString);
    });
}


/*====================================
            實驗室設備切換
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

/*====================================
            GroupMeeting
======================================*/
function readGroupMeeting() {
    $.getJSON('./data/presentationHistory.json', function(data) {
        var initString = "";
        $.each( data, function( key, value ) {
            initString += `
            <tr>
                <td>${value.date}</td>
                <td>${value.name}</td>
                <td class=\"td_title\">${value.topic}</td>
            </tr>
            `;
        });
        $('#table_GroupMeeting').children('tbody').append(initString);
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
            $("img.team-img").lazyload({
                effect: "fadeIn",
                event: "lazylazy"
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
readResearchPlan();
readLabMember();
readLabEquipments();
readGroupMeeting();