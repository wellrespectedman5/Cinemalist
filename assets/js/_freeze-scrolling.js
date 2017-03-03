$(document).ready(function () {
    //Freezy sidebar search
    $(function () {
        var $sidebar = $(".content-aside"),
            $window = $(window),
            $header = $('.header'),
            headerOffsetBottom = $header.offset().top + $header.outerHeight(),
            offset = $sidebar.offset(),
            position = $sidebar.position();

        $window.scroll(function () {
            if ($window.width() >= 760) {
                var topAsideSpace = headerOffsetBottom - $window.scrollTop();
                if ($window.scrollTop() >= headerOffsetBottom) {
                    $sidebar.css("margin-top", "0")
                        .addClass('sidebar-fixed');
                } else {
                    $sidebar[0].style.maxHeight = "";
                    $sidebar.css({
                        "margin-top": Math.abs(topAsideSpace)
                    }).removeClass('sidebar-fixed');

                    $sidebar.find('.content-aside-wrapper')
                        .css("max-height", 'calc(100% - ' + Math.abs(topAsideSpace) + 'px)')
                }
            }
        });
    });

    //Disable scrolling when sidebar hovered by user
    (function () {
        function getScrollBarWidth() {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        };

        if ($(window).width() > 1024) {
            $(document).on('mouseenter', '.aside', function () {
                var $aside = $(this),
                    $sidebar = $aside.parents('.content-aside'),
                    $content = $('.content-body'),
                    browserScrollWidth = getScrollBarWidth();


                if ($(window).width() >= 760) {
                    //Add scroll imitation tag
                    $('body').addClass('scroll-imitation').append("<span class='scroll-imitator'></span>");
                    var scrollImitator = $('.scroll-imitator');
                    scrollImitator.css('width', browserScrollWidth);

                    $('body').css('padding-right', browserScrollWidth);

                    if ($(window).width() >= 760) {
                        $sidebar.css('transform',
                            'translateX(-' + browserScrollWidth + 'px)');
                    }
                }

                $aside.addClass('scroll-active');
                $content.addClass('scroll-disabled');
            });

            $(document).on('mouseleave', '.aside', function () {
                var $aside = $(this),
                    $sidebar = $aside.parents('.content-aside'),
                    globalWrapper = $('.global_wrapper'),
                    $content = $('.content-body'),
                    scrollImitator = $('.scroll-imitator');

                if ($(window).width() >= 760) {
                    $('body').removeClass('scroll-imitation')
                        .css('padding-right', 0);

                    $sidebar.css('transform',
                        'translateX(0)');
                }

                scrollImitator.remove();
                $aside.removeClass('scroll-active');
                $content.removeClass('scroll-disabled');
            })
        }
    }());

});