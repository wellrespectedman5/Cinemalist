$(document).ready(function() {

    //Make each select as custom
    (function() {
        $.each($('.custom-it'), function(idx, _el) {
            var $self = $(this);
            if ($self.hasClass('search-field')) {
                $self.chosen({
                    placeholder_text_single: $self.data('placeholder'),
                    no_results_text: "Ничего не найдено!",
                });
            } else {
                $self.chosen({
                    placeholder_text_single: $self.data('placeholder'),
                    no_results_text: "Ничего не найдено!",
                    disable_search_threshold: 10
                });
            }
        });
        $.each($('.first-option-selected'), function() {
            var $self = $(this);
            $self.parent().find('.chosen-container').addClass('first-option-selected');
            $self.removeClass('first-option-selected');
        });

        $(document).on('change', '.aside-search__body .custom-it', function() {
            var $self = $(this);
            if ($self.children('option').first().prop('selected')) {
                $self.siblings('.chosen-container').addClass('first-option-selected');
            } else {
                $self.siblings('.chosen-container').removeClass('first-option-selected');
            }
        });
    }());

    //Make each select simple-custom
    (function() {
        $.each($('.simple-select'), function(idx, _el) {
            var $self = $(this);
            $self.chosen({
                placeholder_text_single: $self.data('placeholder'),
                no_results_text: "Ничего не найдено!",
                disable_search_threshold: 10
            });
        });
    }());

    //Input-group change tabs
    (function() {
        $(document).on('click', '.js-input-tab', function(e) {
            e.preventDefault();
            var $self = $(this);

            $self.closest('.input-group').toggleClass('form-toggle');
        });
    }());

    //popup close
    (function() {
        $(document).on('click', '.js-popup-close', function(e) {
            e.preventDefault();
            $.fancybox.close();
        });
    }());

    //Toggle full-size aside
    (function() {
        $(document).on('click', '.js-aside-full', function(e) {
            e.preventDefault();
            var $self = $(this),
                wrapper = $('.global_wrapper');

            wrapper.toggleClass('aside--fullsize');
        });
    }());

    //Burger functional
    (function() {
        $(document).on('click', '.js-menu-toggle', function(e) {
            e.preventDefault();
            var $self = $(this);
            $self.parent().toggleClass('burger-toggle');
        });
    }());

    //clapperboard functional
    (function() {
        $(document).on('click', '.js-toggle-step', function(e) {
            e.preventDefault();
            var $self = $(this),
                selfIndex = $self.index(),
                tab = $('.clapperboard-body');

            $self.siblings().removeClass('is-active').end().addClass('is-active');
            if (tab.eq(selfIndex).length) {
                tab.removeClass('is-toggle').eq(selfIndex).addClass('is-toggle');
            } else {
                alert('Tab <' + selfIndex + '> not found');
            }
        });
    }());

    //Project toggling full view functional
    (function() {
        $(document).on('click', '.project .project-show_more', function(e) {
            e.preventDefault();
            var $self = $(this),
                $selfParent = $self.parent();

            $selfParent.toggleClass('project-full');

            if ($selfParent.hasClass('project-full')) {
                $self.html('Свернуть')
            } else {
                $self.html('Развернуть')
            }
        });
    }());

    //Extend search into aside
    (function() {
        $(document).on('click', '.js-extended-search', function(e) {
            e.preventDefault();
            var $self = $(this);
            $self.parent().toggleClass('is-open');

            if ($self.parent().hasClass('is-open')) {
                $self.html('Свернуть');
            } else {
                $self.html('Рассширенный поиск');
            }
        });
    }());

    // Accordion functional
    (function() {
        $(document).on('click', '.accordion__title', function(e) {
            e.preventDefault();
            var $self = $(this);
            $self.parent().toggleClass('is-toggle');

            if ($self.parent().hasClass('is-toggle')) {} else {}
        });
    }());

    //Tabs functional
    (function() {
        var tabsWrap = $('.tabs');

        $.each(tabsWrap, function(index, _item) {
            var currentTab = $(this);
            if (currentTab.find('.tabs__header').length && currentTab.find('.tabs__body').length) {

                currentTab.find('.tabs__header-wrap').children('.tabs__header-item:first-child').addClass('is-active');
                currentTab.find('.tabs__body').children('.tabs__body-item:first-child').addClass('is-active');

                //Tab click changing
                currentTab.find('.tabs__header-link').click(function(e) {
                    e.preventDefault();
                    var $self = $(this).parent(),
                        $selfIndex = $self.index(),
                        tabsBody = currentTab.find('.tabs__body-item'),
                        tabsHead = currentTab.find('.tabs__header-item');

                    if (!$self.hasClass('is-active')) {
                        tabsBody.removeClass('is-active');
                        tabsHead.removeClass('is-active');

                        $self.addClass('is-active');
                        tabsBody.eq($selfIndex).addClass('is-active');

                    } else {
                        return false;
                    }

                });

            } else {
                console.log('Tabs not found');
            }
        });
    }());


    //Function that calc center block size and position
    (function() {
        var square = $('.people-preview__square');
        if (square.length) {

            function calculatePeopleSquare(scope, itemsCount, contentWidth) {
                var itemsInRow = itemsCount,
                    itemWidth = contentWidth / itemsInRow;


                scope.height(5 * itemWidth);
                var squareLogoWidth = ($(window).width() > 660) ? (itemsInRow * itemWidth) / 3 : itemWidth * 3;
                //    check square size
                $('.people-preview__square').css({
                    'width': squareLogoWidth,
                    'height': itemWidth,
                    'top': itemWidth * 2
                });
            }

            var peopleSquare = (function checkSquare() {
                var peopleWrap = square.parent(),
                    windowWidth = $(window).width(),
                    contentWidth = ($(window).width() > 760) ? $(window).width() - $('.content-aside').width() : $(window).width();

                if (windowWidth > 660) {
                    calculatePeopleSquare(peopleWrap, 15, contentWidth);
                } else if (windowWidth <= 660 && windowWidth > 300) {
                    calculatePeopleSquare(peopleWrap, 5, contentWidth);
                }

                return checkSquare;
            }());

            $(window).resize(function() {
                peopleSquare();
            });
        }
    }());

    // comments reply append form
    (function() {
        var formTemplate = "" +
            "<div class='comments-reply-form'>" +
            " <form method='POST' action='/'>" +
            "<div class='input-group'>" +
            "<textarea name='comment-text' placeholder='Тут можно написать ваш комментарий'></textarea>" +
            "</div>" +
            "<input type='submit' class='button button--black' value='Отправить'>" +
            "<a href='#' class='comments__remove'>Отменить</a> " +
            "</form>" +
            "</div>";
        $.fn.focusToEnd = function() {
            return this.each(function() {
                var v = $(this).val();
                $(this).focus().val("").val(v);
            });
        };
        $(document).on('click', '.comments__reply', function(e) {
            e.preventDefault();
            $('.comments-reply-form').remove();
            $('.js-reply-form').removeClass('js-reply-form');

            var $self = $(this),
                authorName = $self.parents('.author__info').find('.name').html().split(' ');

            $self.closest('.comments__item,.comments__subitem').addClass('js-reply-form');
            $self.closest('.comments__item,.comments__subitem').append(formTemplate).find('textarea').html(authorName[0] + ', ');

            $self.closest('.comments__item,.comments__subitem').find('textarea').focusToEnd();
        });

        $(document).on('click', '.comments__remove', function(e) {
            e.preventDefault();
            $('.comments-reply-form').remove();
            $('.js-reply-form').removeClass('js-reply-form');
        });
    }());

    //Tabs search input focus functionality
    (function() {
        var searchInput = $('.js-faq-search');
        if (searchInput.length) {
            $(document).on('focus', '.js-faq-search', function() {
                var $self = $(this);
                if ($self.parents('.tabs__header').length) {
                    $self.parents('.tabs__header').addClass('search-toggle');
                    $self.attr('placeholder', 'Начать поиск');
                    //remove search's blocks
                    $('.base-search-close').remove();
                    $('.base-search-body').remove();

                    //init search's blocks
                    $self.parent().append("<a href='#' class='base-search-close'></a>");
                    $self.closest('.tabs').find('.tabs__body').append("<div class='base-search-body'></div>");
                }
            });
            $(document).on('blur', '.js-faq-search', function() {
                var $self = $(this);
                if ($self.parents('.tabs__header').length && $self.parents('.tabs__header').hasClass('search-toggle') && ($self.val().length < 1)) {
                    $self.attr('placeholder', 'Поиск по базе знаний');
                    $self.parents('.tabs__header').removeClass('search-toggle');
                }
            });
            $(document).on('click', '.base-search-close', function(e) {
                e.preventDefault();
                $('.js-faq-search').val("").attr('placeholder', 'Поиск по базе знаний');
                $(this).closest('.tabs__header').removeClass('search-toggle');
            });
        }
    }());

    //people list view toggling
    (function() {
        var views = $('.views');
        views.find('.view--table').addClass('is-toggle');
        $('.people-view').find('.people-view__table').addClass('is-active');

        $(document).on('click', '.people-view a', function(e) {
            e.preventDefault();
            var $self = $(this);
            //
            if ($self.hasClass('is-active')) {
                return false;
            } else {
                $('.people-view a').removeClass('is-active');
                $self.addClass('is-active');
                //
                if ($self.hasClass('js-view-toggle-list')) {
                    views.children().removeClass('is-toggle');
                    views.find('.view--list').addClass('is-toggle');
                } else if ($self.hasClass('js-view-toggle-table')) {
                    views.children().removeClass('is-toggle');
                    views.find('.view--table').addClass('is-toggle');
                } else {
                    return false;
                }
            }
        });
    }());

    //Checkbox:checked toggling droplist
    (function() {
        var dropDown = $('.checkbox-dropdown');
        if (dropDown.length) {
            var label = dropDown.parent().children('.checkbox-wrap').children('.checkbox-square');

            label.click(function() {
                var checkbox = ($(this).parent().children("input[type='checkbox']:checked").length ? 0 : 1),
                    dropList = $(this).parents('.checkbox-group').find('.checkbox-dropdown');

                if (checkbox) {
                    dropList.addClass('is-toggle');
                    console.log(1);
                } else {
                    dropList.removeClass('is-toggle');
                    console.log(0);
                }
            });
        }
    }());

    //At settings page change tab with 'next' button
    (function() {
        $(document).on('click', '.js-settings-next', function(e) {
            e.preventDefault();
            var tabIndex = $('.tabs__header').children('.is-active').index();
            $('.tabs__header').children().eq(tabIndex + 1).find('.tabs__header-link').click();

            changeTab($('.tabs__header-wrap'), 4);
        });
    }());

    //multiple selection
    (function() {
        $(document).on('change', '.js-select-multiple', function() {
            var $self = $(this),
                hiddenName = $self.prop('name') + '-hidden',
                selectedValue = $(this).val(),
                parent = $self.parent();

            if (!parent.find('.selected-values').length) {
                parent.prepend("<div class='values-wrap'>" +
                    "<ul class='selected-values'></ul>" +
                    "<input type='hidden' name='" + hiddenName + "' />" +
                    "</div>");
            }

            if (selectedValue != 'undefined') {
                $self.find("option[value='" + selectedValue + "']").attr('disabled', true);
                var checkedIndex = $self.find("option[value='" + selectedValue + "']").index();

                (parent.find('.chosen-results').length) ? $self.trigger("chosen:updated"): console.log('without customize');

                var selectList = parent.find('.selected-values'),
                    inputHidden = parent.find("input[name='" + hiddenName + "']");
                inputHidden.val(inputHidden.val() + selectedValue + ',');

                selectList.append("<li class='selected-values__item'>" +
                    "<span class='selected-values__text'>" + selectedValue + "</span>" +
                    "<a href='#' class='selected-value--remove'></a>" +
                    "</li>");
            }
        });
    }());

    //Tooltips generator
    (function() {
        var _el = $('[data-tooltip]'),
            windowWidth = $(window).width;
        if (windowWidth > 760) {
            $.each(_el, function() {
                var $self = $(this),
                    elPos = $self.data('tooltip-pos'),
                    elText = $self.data('tooltip');

                $(this).tipso({
                    'width': 'auto',
                    'background': '#fff',
                    'color': '#000',
                    'delay': 100,
                    'speed': 200,
                    'position': elPos,
                    'content': elText
                });
            });
        } else {
            $.each(_el, function() {
                var $self = $(this),
                    elText = $self.data('tooltip');

                $(this).tipso({
                    'width': 'auto',
                    'background': '#fff',
                    'color': '#000',
                    'delay': 100,
                    'speed': 200,
                    'content': elText
                }).end().css('text-align', 'left');
            });
        }
    }());

    //Get info from 2 select's
    (function() {
        var twoStepSelectWrap = $('.js-two-step-select'),
            languageInput = twoStepSelectWrap.find('#language-selects'),
            languageRow = {
                language: '',
                level: '',
                langVal: '',
                langLvl: ''
            },
            firstSelect, secondSelect,
            firstOption, secondOption,
            languageArr = [];

        //
        $.each(twoStepSelectWrap, function() {
            var $self = $(this);
            ($self.find('select:nth-of-type(1)').hasClass('js-first-step')) ? !1: $self.find('select:nth-of-type(1)').addClass('js-first-step');
            ($self.find('select:nth-of-type(2)').hasClass('js-second-step')) ? !1: $self.find('select:nth-of-type(2)').addClass('js-second-step');
            firstSelect = $self.find('.js-first-step');
            secondSelect = $self.find('.js-second-step');

            firstSelect.on('change', function() {
                if ($(this).val() != 'undefined' && $(this).val() != '' && $(this).val != null) {
                    firstOption = firstSelect.find("option[value='" + $(this).val() + "']").html();
                    languageRow.language = firstOption;
                    languageRow.langVal = $(this).val();
                    togglingResults($self, languageRow);
                }
            });

            secondSelect.on('change', function() {
                if ($(this).val() != 'undefined' && $(this).val() != '' && $(this).val != null) {
                    secondOption = secondSelect.find("option[value='" + $(this).val() + "']").html();
                    languageRow.level = secondOption;
                    languageRow.langLvl = $(this).val();
                    togglingResults($self, languageRow);
                }
            });
        });

        if (languageInput.val()) {
            var languageArrPrototype = languageInput.val().split(','),
                outputArray = [],
                currentString = [];

            languageArrPrototype.splice(languageArrPrototype.length - 1, 1);
            for (var i = 0; i <= languageArrPrototype.length - 1; i++) {
                var handleArray = {
                    language: '',
                    level: '',
                    langVal: '',
                    langLvl: ''
                };
                currentString[0] = (languageArrPrototype[i] + '').split(':');
                // element html
                handleArray.language = $('.js-first-step').find("option[value='" + currentString[0][0] + "']").html();
                handleArray.level = $('.js-second-step').find("option[value='" + currentString[0][1] + "']").html();
                // element values
                handleArray.langVal = currentString[0][0];
                handleArray.langLvl = currentString[0][1];

                // push to new array
                outputArray.push(handleArray);

                console.log(outputArray)
            }
            languageArr = outputArray;
        }

        var parseExistLanguages = function(recivedArray) {
            var inputValue = $(".js-first-step");

            inputValue.find("option[value=" + recivedArray[0].langVal + "]").prop('disabled', false);
            clearSelects();
        };

        //function that convert array of languages to html
        var convertToHtml = function(currentDOM, recivedArray) {
            var uselessVariable = 0,
                inputValue = $(".js-first-step");
            ($('.selected-values').length) ? uselessVariable++ : $(currentDOM).find('label').after("<ul class='selected-values'></ul>");
            var languagesList = $('.selected-values');
            languagesList.empty();

            for (var idx = 0; idx <= recivedArray.length - 1; idx++) {
                var languageString = recivedArray[idx].language + ', ' + recivedArray[idx].level,
                    valueString = recivedArray[idx].langVal + ':' + recivedArray[idx].langLvl;

                languagesList.append("<li class='selected-values__item' data-select-index='" + idx + "'" +
                    "<span class='selected-values__text'>" + languageString + "</span>" +
                    "<a href='#' class='selected-value--remove' data-string-value='" + valueString + "'></a>" +
                    "</li>");

                inputValue.find("option[value=" + recivedArray[idx].langVal + "]").prop('disabled', true);
            }
        };

        //function that clearing select's
        var clearSelects = function() {
            var firstSelectValue = firstSelect.children().first().val(),
                secondSelectValue = secondSelect.children().first().val();
            languageRow = {
                language: '',
                level: '',
                langVal: '',
                langLvl: ''
            };
            //reset+update selects
            firstSelect.val(firstSelectValue).trigger("chosen:updated");
            secondSelect.val(secondSelectValue).trigger("chosen:updated");
        };

        //Remove info from list + from input[hidden]
        $(document).on('click', '.selected-value--remove', function(e) {
            e.preventDefault();
            var $self = $(this),
                $selfParent = $self.parent(),
                selRemoveVal = $self.data('string-value'),
                parentIndex = $selfParent.index(),
                inputHidden = $self.parents('.js-two-step-select').find("input[type=hidden]");

            var selectedItems = inputHidden.val().split(',');

            for (var i = selectedItems.length - 1; i >= 0; i--) {
                if (selectedItems[i] === selRemoveVal) {
                    selectedItems.splice(i, 1);
                    break;
                }
            }

            //Remove exist values and re-generate HTML
            var transferArray = languageArr.splice(parentIndex, 1);
            console.log(transferArray)
            parseExistLanguages(transferArray);
            convertToHtml($('.selected-values'), languageArr);

            // Generate new array of values
            var outputArray = selectedItems;
            inputHidden.val(outputArray)
        });

        //map of selected options
        var togglingResults = function(selectWrapp, obj) {
            if ((obj.language != 'undefined' && obj.language != '') && (obj.level != 'undefined' && obj.level != '')) {
                var receivedObj = {};

                receivedObj['language'] = obj.language;
                receivedObj['level'] = obj.level;
                //Value of input object
                receivedObj['langVal'] = obj.langVal;
                receivedObj['langLvl'] = obj.langLvl;

                if (languageArr.length) {
                    var hasProp = false;
                    for (var j = 0; j <= languageArr.length - 1; j++) {
                        (languageArr[j].language == receivedObj['language']) ? hasProp = true: hasProp = false;
                    }
                    // console.log(hasProp);
                    if (!hasProp) {
                        languageArr.push(receivedObj);
                        convertToHtml(selectWrapp, languageArr);
                        languageInput.val(languageInput.val() + (receivedObj['langVal'] + ":" + receivedObj['langLvl']) + ",");
                        clearSelects();
                    } else {
                        clearSelects();
                        alert(obj.language + '- language already selected');
                        return false;
                    }
                } else {
                    languageArr.push(receivedObj);
                    convertToHtml(selectWrapp, languageArr);
                    languageInput.val(languageInput.val() + (receivedObj['langVal'] + ":" + receivedObj['langLvl']) + ",");
                    clearSelects();
                }
            }
        };
    }());

    //Create profile blur-backgorund
    (function() {
        var profile = $('.profile'),
            blurWrap = $('.content-body[data-default-blurmode]'),
            blurMode;
        const BLUR_VALUE = 8;

        if (profile.length) {
            blurMode = blurWrap.data('default-blurmode');
            if (blurMode == 'daily') {
                blurWrap.addClass('daily--mode');
                $('.profile_mode--daily').addClass('is-active');
            } else if (blurMode == 'nightly') {
                blurWrap.addClass('nightly--mode');
                $('.profile_mode--nightly').addClass('is-active');
            }

            var imageSrc = profile.find('.picture-wrap').children('img').attr('src');

            if (imageSrc != 'undefined') {
                profile.parent().prepend("<figure class='profile-blur'>" +
                    "<canvas id='profile-blurred-bg' " +
                    "style='position: absolute; left:0;right:0;top:0;height: 100%;width: 100%;'></canvas>" +
                    "</figure>");

                var canvas = document.querySelector('#profile-blurred-bg'),
                    canvasContext = canvas.getContext('2d');

                var image = new Image();
                image.src = imageSrc;

                var drawBlur = function() {
                    var w = canvas.width;
                    var h = canvas.height;
                    canvasContext.drawImage(image, 0, 0, w, h);
                    stackBlurCanvasRGBA('profile-blurred-bg', 0, 0, w, h, BLUR_VALUE);
                };

                image.onload = function() {
                    drawBlur();
                };

                // $('.profile-blur').css({
                //     "background": "url(" + imageSrc + ") top center no-repeat transparent",
                //     "background-size": 'cover'
                // });
            }
        }
        $(document).on('click', '.profile_mode', function(e) {
            e.preventDefault();
            var $self = $(this),
                profileWrap = $('.profile-blur');

            if ($self.hasClass('is-active')) {
                return false;
            } else {
                if ($self.hasClass('profile_mode--daily')) {
                    $self.siblings().removeClass('is-active');
                    $self.addClass('is-active');
                    blurWrap.removeClass('nightly--mode').addClass('daily--mode')

                } else if ($self.hasClass('profile_mode--nightly')) {
                    $self.siblings().removeClass('is-active');
                    $self.addClass('is-active');
                    blurWrap.removeClass('daily--mode').addClass('nightly--mode')
                }
            }
        });
    }());

    //toggling profile forms
    (function() {
        $(document).on('click', '.js-profile-form', function(e) {
            e.preventDefault();
            var $self = $(this),
                originText = ($self.data('origin-text') != 'undefined') ? $self.data('origin-text') : 'none',
                changetoText = ($self.data('changeto-text') != 'undefined') ? $self.data('changeto-text') : 'none',
                profileBody = $self.parents('.tabs__body-item').find('.profile-info-body'),
                profileForm = $self.parents('.tabs__body-item').find('.profile-info-form');

            if (profileBody.hasClass('is-toggle')) {
                profileBody.removeClass('is-toggle');
                profileForm.addClass('is-toggle');
                $self.children('i.plus-icon').css('transform', 'rotate(45deg)');
                (changetoText != 'none') ? $self.find('span').html(changetoText): !1;
            } else {
                profileForm.removeClass('is-toggle');
                profileBody.addClass('is-toggle');
                $self.children('i.plus-icon').css('transform', 'rotate(0deg)');
                (originText != 'none') ? $self.find('span').html(originText): !1;
            }
        });
    }());

    (function() {
        var tagWrapper = $('.tag-filter'),
            displayValue = ($(window).width() > 1480) ? 'inline-block' : 'block';
        if (tagWrapper.length) {
            $(document).on('click', '.tag-filter__list li a', function(e) {
                e.preventDefault();
                var $self = $(this),
                    filterItems = $('.tag-filter__item'),
                    filterTag = $self.data('filter-id');

                $self.parent().siblings().removeClass('is-active');
                $self.parent().addClass('is-active');

                if (filterTag != 'All') {
                    filterItems.css('display', 'none');
                    $.each(filterItems, function() {
                        var currentItem = $(this),
                            itemAttributes = currentItem.data('filter-attr');

                        if (itemAttributes == filterTag) {
                            console.log('filtering items with tags: ' + itemAttributes);
                            currentItem.css('display', displayValue);
                        }
                    });
                } else {
                    console.log('filtering all items', displayValue);
                    filterItems.css('display', displayValue);
                }
            });
        }
    }());


    //requests toggle textarea
    (function() {
        var requestAreaToggler = $('.js-letter-toggle');

        if (requestAreaToggler.length) {
            $(document).on('click', '.js-letter-toggle', function(e) {
                e.preventDefault();
                var $self = $(this),
                    currentText = 'Написать сопроводительное письмо',
                    changeToText = 'Скрыть',
                    checksBlock = $self.parent();
                console.log(currentText);
                $self.parent().toggleClass('is-toggle');
                if (checksBlock.hasClass('is-toggle')) {
                    $self.children('span').html(changeToText);
                } else {
                    $self.children('span').html(currentText);
                }
            });
        }
    }());

    //grayscale filter
    (function() {
        var peopleList = $('.people-preview__list');

        if (peopleList.length) {
            peopleList.find('img').gray();
            $(document).on('mouseenter', '.people-preview__list img', function() {
                $(this).addClass('grayscale-off');
            });
            $(document).on('mouseleave', '.people-preview__list img', function() {
                $(this).removeClass('grayscale-off');
            })
        }
    }());

    //Upload project image with preview
    (function() {
        var inputFile = $('#project-preview'),
            fileArray = [],
            totalFileCounter = 0,
            totalInput = $('#project-upload-files');
        window.filesFormData = new FormData();

        if (inputFile.length) {
            var inputLabel = $('.project-preview-label');
            inputLabel.after("<ul id='project-preview_list'></ul>")

            function readImage(file) {
                var reader = new FileReader();
                var image = new Image();

                reader.readAsDataURL(file);
                reader.onload = function(_file) {
                    image.src = _file.target.result; // url.createObjectURL(file);
                    image.onload = function() {
                        $('#project-preview_list').append('<li class="project-preivew__item">' +
                            '<img src="' + this.src + '">' +
                            '<a class="project-preview-remove" title="Удалить превью проекта"></a>' +
                            '</li>');
                    };

                    image.onerror = function() {
                        alert('Invalid file type: ' + file.type);
                    };
                };
            }

            //remove preview func.
            $(document).on('click', '.project-preview-remove', function(event) {
                event.preventDefault();

                var $self = $(this),
                    selfIndex = $self.parent().index();

                if (selfIndex > -1) {
                    fileArray.splice(selfIndex, 1);
                    // totalInput.files = fileArray;
                    $('#project-preview_list').find('li').eq(selfIndex).remove();
                    window.filesFormData.delete("uploadedImage[" + (selfIndex + 1) + "]");
                    totalFileCounter--;
                }
                //LOGGING IN CONSOLE EXAMPLE OF DATA
                for (var pair of window.filesFormData.entries()) {
                    console.log(pair[0] + '--' + pair[1]);
                }
            });

            inputFile.change(function(e) {
                if (this.disabled) {
                    return alert('Подгрузка фото недоступна! Пожалуйста используйте более новый браузер.');
                }

                var inputFiles = this.files;
                if (inputFiles.length && inputFiles[0]) {
                    for (var i = 0; i < inputFiles.length; i++) {
                        if (totalFileCounter < 5) {
                            totalFileCounter++;
                            fileArray.push(inputFiles[i]);
                            readImage(inputFiles[i]);
                            //APPENDING DATA
                            window.filesFormData.append(
                                'uploadedImage[' + totalFileCounter + ']',
                                inputFiles[i]);
                        } else {
                            alert('Достигнут лимит фото!');
                            break;
                        }
                    }

                    //LOGGING IN CONSOLE EXAMPLE OF DATA
                    for (var pair of window.filesFormData.entries()) {
                        console.log(pair[0] + '--' + pair[1]);
                    }

                    //THERE MUST BE AJAX UPLOAD
                    //    $.ajax
                }
            });
        }
    }());

    //tabs swipe functional
    (function() {
        var windowWidth = $(window).width(),
            swipeTarget = $(".tabs__header-wrap"),
            maxDistance = 0,
            itemsWidthArray = [];
        //
        //get outerWidth of element including margins
        function outerWidth(el) {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);

            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
            return width;
        }

        //
        //Calculate full width
        $.each(swipeTarget.children(), function() {
            maxDistance += outerWidth($(this)[0]) + 15;
            itemsWidthArray.push(maxDistance)
        });
        //
        console.log(itemsWidthArray);
        //
        if (windowWidth < maxDistance && swipeTarget.length) {
            swipeTarget.css({
                'overflow': 'auto',
                'overflow-y': 'hidden',
                '-webkit-overflow-scrolling': 'touch',
                '-ms-overflow-style': '-ms-autohiding-scrollbar',
                'padding-bottom': '20px'
            });
            swipeTarget.parent().css({
                'overflow': 'hidden',
                'height': '34px'
            });
            //         //add min-width to tab-parent
            //         $('.tabs__header').find('a').css('pointer-events', 'none');
            //         swipeTarget.css('min-width', maxDistance);
            //         var swipeEl = document.getElementsByClassName('tabs__header')[0],
            //             mc = new Hammer(swipeEl);
            //
            //         mc.get('pan').set({direction: Hammer.DIRECTION_ALL});
            //         //move left/right
            //         mc.on("swiperight swipeleft", function (event) {
            //             changeTab(swipeTarget, event.direction);
            //         });
        }
    }());

    $(document).mouseup(function(e) {
        var closeDiv = $('.global_wrapper.aside--fullsize');
        if (!closeDiv.is(e.target) // если клик был не по нашему блоку
            && closeDiv.has(e.target).length === 0) { // и не по его дочерним элементам
            closeDiv.removeClass('aside--fullsize');
        }
    });

    //popups
    (function() {
        $('.popup-call').fancybox({
            'padding': 0,
            'overlayOpacity': 0.5,
            'overlayColor': '#000',
            'transitionIn': 'none',
            'transitionOut': 'none',
            'titlePosition': 'inside',
            'centerOnScroll': true,
            'maxWidth': 800,
        });
    }());

});
