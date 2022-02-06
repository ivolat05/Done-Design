//= components/jquery.min.js
//= components/jquery.magnific-popup.min.js
//= components/jquery.mCustomScrollbar.js
//= components/slick.min.js
//= components/uderscore.min.js
//= components/jquery.maskedinput.min.js
//= components/moment.js
//= components/clndr.js

$(function () {

    // calendar 
    function calendars() {
        let calendars = {};
        let thisMonth = moment().format('YYYY/MM/DD');
        let inputDate = document.querySelector('.input-date');
        if (inputDate) {
            inputDate.value = thisMonth.split("/").reverse().join("/");
            calendars.clndr3 = $('.calendar__container').clndr({
                lengthOfTime: {
                    months: 2,
                    interval: 1
                },
                default_date: true,
                startWithMonth: thisMonth,
                daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                trackSelectedDate: true,
                selectedDate: "selected",
                showAdjacentMonths: false,
                adjacentDaysChangeMonth: true,
                weekOffset: 1,
                clickEvents: {
                    click: function (target) {
                        let x = '';
                        let y = target.date._i
                        inputDate.value = target.date._i;
                        for (let i = 0; i < y.length; i++) {
                            if (y[i] == '-') {
                                x += '/';
                            } else {
                                x += y[i];
                            }
                        }
                        inputDate.value = x.split("/").reverse().join("/");
                    }
                },
                template: $('#calendar__teplate').html()
            });
        }
    }

    calendars();

    // mask
    $(".phone").mask("+7 999 999 99 99");
    $(".info-phone-input").mask("+7 999 999 99 99");

    // select
    let select = function () {
        let selectHeader = document.querySelectorAll('.select__header');
        let selectItem = document.querySelectorAll('.select__item');
        if (selectHeader) {
            selectHeader.forEach((item) => {
                item.addEventListener('click', selectToggle)
            })

            selectItem.forEach((item) => {
                item.addEventListener('click', selectChoose)
            })

            function selectToggle() {
                this.parentElement.classList.toggle('is-active');
                this.parentElement.parentElement.classList.toggle('active');
            }

            function selectChoose() {
                let text = this.innerText;
                let select = this.closest('.select');
                let currentText = select.querySelector(".select__current");
                currentText.innerText = text;
                currentText.value = text;
                select.classList.remove('is-active');
                select.parentElement.classList.remove('active');
            }
        }

    }
    select();

    // checked filter deactive
    function deactiveChecked() {
        let fillterBtn = document.querySelectorAll('.fillter-btn');
        if (fillterBtn) {
            fillterBtn.forEach((item) => {
                item.addEventListener('click', () => {
                    let checkInput = document.querySelectorAll('.check__input');
                    for (let i = 0; i < checkInput.length; i++) {
                        if (checkInput[i].checked) {
                            checkInput[i].checked = false;
                        }
                    }
                })
            })
        }

    }
    deactiveChecked();

    // active map 

    function activeMap() {
        let showInput = document.querySelectorAll('.show__input');
        let mapContainer = document.querySelectorAll('.map__container')
        if (mapContainer && showInput) {
            showInput.forEach((item) => {
                item.addEventListener('click', () => {
                    if (item.checked) {
                        for (let i = 0; i < mapContainer.length; i++) {
                            mapContainer[i].classList.add('active');
                        }
                    } else {
                        for (let i = 0; i < mapContainer.length; i++) {
                            mapContainer[i].classList.remove('active');
                        }
                    }
                })
            })
        }
    }
    activeMap();
    //menu active

    function menuActive() {
        let menu = document.querySelector('.menu');
        let backgroundFon = document.querySelector('.background-fon');
        let body = document.querySelector('body');
        let btnMenu = document.querySelectorAll('.btn-menu');
        let menuClose = document.querySelector('.menu-close');
        if (menu) {
            btnMenu.forEach((item) => {
                item.addEventListener('click', () => {
                    if (!menu.classList.contains('acitve')) {
                        menu.classList.add('active');
                    } else {
                        menu.classList.remove('active');
                    }
                    if (!backgroundFon.classList.contains('acitve')) {
                        backgroundFon.classList.add('active');
                    } else {
                        backgroundFon.classList.remove('active');
                    }
                    body.classList.add('stop');
                });
            });
            backgroundFon.addEventListener('click', () => {
                body.classList.remove('stop');
                backgroundFon.classList.remove('active');
                menu.classList.remove('active');
            });
            menuClose.addEventListener('click', () => {
                body.classList.remove('stop');
                backgroundFon.classList.remove('active');
                menu.classList.remove('active');
            })
        }
    };
    menuActive();

    // autocomplete
    //classInputSearch - имя класса input
    // arr - массив данных
    let listCountry = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
    autocomplete("address", listCountry);
    autocomplete("location", listCountry);

    function autocomplete(classInputSearch, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        let inp = document.querySelector('.' + classInputSearch);
        let currentFocus;
        if (inp) {
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function (e) {
                let a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/

                inp.parentElement.classList.add('active')
                closeAllLists();
                // добовление класса к родительскому блоку
                inp.parentElement.classList.add('active')
                if (!val) { return false; }
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/
                for (i = 0; i < arr.length; i++) {
                    /*check if the item starts with the same letters as the text field value:*/
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function (e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                }
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function (e) {
                let x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    /*If the arrow DOWN key is pressed,
                    increase the currentFocus variable:*/
                    currentFocus++;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 38) { //up
                    /*If the arrow UP key is pressed,
                    decrease the currentFocus variable:*/
                    currentFocus--;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 13) {
                    /*If the ENTER key is pressed, prevent the form from being submitted,*/
                    e.preventDefault();
                    if (currentFocus > -1) {
                        /*and simulate a click on the "active" item:*/
                        if (x) x[currentFocus].click();
                    }
                }
            });
            function addActive(x) {
                /*a function to classify an item as "active":*/
                if (!x) return false;
                /*start by removing the "active" class on all items:*/
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                /*add class "autocomplete-active":*/
                x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
                /*a function to remove the "active" class from all autocomplete items:*/
                for (let i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }
            function closeAllLists(elmnt) {
                /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
                let x = document.getElementsByClassName("autocomplete-items");
                for (let i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }

            }
            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
                // удалене класса у родительскому блоку
                inp.parentElement.classList.remove('active')
            });
        }
    }


    // генерация списка времени
    // timeBoxName -имя контейнера для времени
    // minHour - начальное время
    // maxHour- конечное время
    // intervalМinutes - интервал между минутами

    function timeList(timeBoxName, minHour, maxHour, intervalМinutes) {
        let timeBox = document.querySelector(`.${timeBoxName}`);
        let listBox = '';
        if (timeBox) {
            for (let i = minHour; i < maxHour + 1; i++) {
                for (let y = 0; y < 60; y += intervalМinutes) {
                    if (y >= 10) {
                        listBox += ` <div class="time__box-btn">${i} : ${y}</div>`
                    } else {
                        listBox += ` <div class="time__box-btn">${i} : 0${y}</div>`
                    }

                }

            }
            timeBox.innerHTML = listBox;
        }
    }

    timeList("time__box", 6, 21, 30);

    // добовления времени в input

    function addTime() {
        let timeBoxBtn = document.querySelectorAll('.time__box-btn');
        let inputTime = document.querySelector('.input-time');
        if (timeBoxBtn) {

            timeBoxBtn.forEach((item) => {
                item.addEventListener('click', () => {
                    inputTime.value = item.textContent;
                })
            })
        }
    }
    addTime();

    //костюмизация скрола

    $(".time__box").mCustomScrollbar();






    // slick slider

    $(".top__slaider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        prevArrow: $(".top-slick-prev"),
        nextArrow: $(".top-slick-next"),
        responsive: [

            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,

                }
            },

            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1

                }
            }
        ]
    });


    $(".company__slick").slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,

        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,

                }
            },

            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1

                }
            }
        ]
    });

    $(".related-wrapp-slaider").slick({
        slidesToShow: 4,
        slidesToScroll: 1,

        arrows: true,
        prevArrow: $(".related-prev"),
        nextArrow: $(".related-next"),
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,

                }
            },

            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1

                }
            }
        ]
    });


    // развертование списка результата поиска
    function resultActive() {
        let checkboxActive = document.querySelector('.show-label');
        let resultBox = document.querySelectorAll('.result__box');
        let showInput = document.querySelector('.show__input');
        let mapContainer = document.querySelector('.map__container');
        let resultWrapperColl = document.querySelector('.result__wrapper-coll');
        if (checkboxActive && resultBox) {
            checkboxActive.addEventListener('click', () => {
                if (showInput.checked) {
                    for (let i = 0; i < resultBox.length; i++) {
                        resultBox[i].classList.add('active');
                    }
                    mapContainer.classList.add('acitve');
                    resultWrapperColl.classList.add('acitve');
                } else {
                    for (let i = 0; i < resultBox.length; i++) {
                        resultBox[i].classList.remove('active');
                    }
                    mapContainer.classList.remove('acitve');
                    resultWrapperColl.classList.remove('acitve');
                }
            })

        }
    }
    resultActive();

    function mapFixed() {
        let mapId = document.getElementById('map');
        if (mapId) {
            let offsetHeader = document.querySelector('.header').offsetHeight;
            let offsetSearchBox = document.querySelector('.search-box').offsetHeight;
            let offsetFilter = document.querySelector('.filter').offsetHeight;
            let summHead = offsetHeader + offsetSearchBox + offsetFilter;

            window.addEventListener('scroll', () => {
                let scrollDistanse = window.scrollY;
                let pageHeight = document.querySelector('.page').offsetHeight;
                let footerHeight = document.querySelector(".footer").offsetHeight;
                let stopMap = pageHeight - 780 - footerHeight;
                if (scrollDistanse >= summHead) {
                    mapId.style.position = 'fixed';
                }
                if (stopMap <= scrollDistanse) {
                    mapId.style.top = 'auto'
                    mapId.style.position = 'absolute';
                    mapId.style.bottom = '40px';
                } else if (stopMap >= scrollDistanse) {
                    mapId.style.top = '0'
                    mapId.style.bottom = 'auto';
                    mapId.style.position = 'fixed';
                }
                if (scrollDistanse < summHead) {
                    mapId.style.position = 'absolute';
                }
            })
        }
    }

    mapFixed();

    // reset player filster

    function playerResetBtn() {
        let playerBtn = document.querySelector('.player__reset-btn');
        if (playerBtn) {
            playerBtn.addEventListener('click', () => {
                let selectCurrent = document.querySelectorAll('.select__current');
                let mainFormInput = document.querySelectorAll('.main-form-input');
                for (let i = 0; i < selectCurrent.length; i++) {
                    selectCurrent[i].value = '';
                }
                for (let i = 0; i < mainFormInput.length; i++) {
                    mainFormInput[i].value = '';
                }
            })

        }
    }
    playerResetBtn();

    // popup 
    $('.popup-content').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade'
    });
    //popup close 
    function closePopup() {
        let popupClose = document.querySelectorAll('.popup-close');
        if (popupClose) {
            popupClose.forEach((item) => {
                item.addEventListener('click', () => {
                    $.magnificPopup.close();
                })
            })
        }

    }
    closePopup();

    // раскрытие карточки игрока

    function morePlayerCard() {
        let playerTextBtn = document.querySelectorAll('.player-text-btn');
        if (playerTextBtn) {
            playerTextBtn.forEach((item) => {
                item.addEventListener('click', () => {
                    if (!item.parentElement.classList.contains('active')) {
                        item.parentElement.classList.add('active');
                    } else {
                        item.parentElement.classList.remove('active');
                    }
                    if (!item.parentElement.parentElement.parentElement.classList.contains('active')) {
                        item.parentElement.parentElement.parentElement.classList.add('active');
                        let playerBox = document.querySelectorAll('.player-box');
                        let x = 0;
                        for (let i = 0; i < playerBox.length; i++) {
                            if (playerBox[i].classList.contains('active')) {
                                x += 1
                            }
                        }
                        item.parentElement.parentElement.parentElement.style.zIndex = `${x}`;
                    } else {
                        item.parentElement.parentElement.parentElement.classList.remove('active');
                        item.parentElement.parentElement.parentElement.style.zIndex = `0`;
                    }


                })
            })
        }

    }
    morePlayerCard();

    // filter blog
    function filterBlog() {
        let blogBox = document.querySelectorAll('.blog__box');
        let blogBtn = document.querySelectorAll('.blog-btn');
        let blogWrapp = document.querySelector('.blog__wrapp')
        if (blogBox && blogBtn) {
            blogBtn.forEach((item) => {
                item.addEventListener('click', () => {
                    let filterClass = item.dataset['filter'];
                    if (filterClass == '--news' || filterClass == '--companies' || filterClass == '--about') {
                        blogWrapp.classList.add('active')
                    }
                    else {
                        blogWrapp.classList.remove('active')
                    }
                    for (let i = 0; i < blogBtn.length; i++) {
                        if (blogBtn[i].classList.contains('active')) {
                            blogBtn[i].classList.remove('active')
                        }
                    }
                    item.classList.add('active');
                    blogBox.forEach((item) => {
                        item.classList.remove('hide');

                        if (!item.classList.contains(filterClass) && filterClass != 'all') {
                            item.classList.add('hide');
                        }
                    })
                })
            })
        }
    }
    filterBlog();

    // показывать скрывать пароль

    function showPassword() {
        let btn = document.querySelectorAll('.password-btn');
        if (btn) {
            btn.forEach((item) => {
                item.addEventListener('click', function () {
                    let passwordId = item.getAttribute('data-password');
                    let showPassword = document.querySelector(passwordId);
                    item.classList.toggle('--active')
                    if (showPassword.getAttribute('type') === 'password') {
                        showPassword.type = 'text';
                    } else {
                        showPassword.type = 'password';
                    }
                })
            })
        }
    };
    showPassword();

    // валидация ввода email
    // validation email
    function validEmail() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let inp = document.querySelectorAll('.input-email');
        let body = document.querySelector('body');

        if (inp) {
            inp.forEach((item) => {
                item.addEventListener('keyup', () => {
                    if (!reg.test(item.value)) {
                        item.classList.add('error')
                    } else {
                        item.classList.remove('error')
                    }
                })
            })
            body.addEventListener('click', () => {
                inp.forEach((item) => {
                    if (item.classList.contains('error')) {
                        item.value = 'fill error'
                    }
                })
            })
        }

    }
    validEmail();

    // tab popup
    function popupTabs() {
        const cabinetBtn = document.querySelectorAll('.popup-btn');
        const cabinetTab = document.querySelectorAll('.popup-login');
        if (cabinetTab) {
            cabinetBtn.forEach((item) => {
                item.addEventListener('click', function () {
                    let tabId = item.getAttribute('data-popup');
                    let currentTab = document.querySelector(tabId);
                    let popupTitleIn = document.querySelector('.popup-title-in');
                    let popupTitleUp = document.querySelector('.popup-title-up');
                    if (item.classList.contains('login-in')) {
                        popupTitleUp.classList.add('active');
                        popupTitleIn.classList.remove('active');
                    } else if (item.classList.contains('sign-up')) {
                        popupTitleUp.classList.remove('active');
                        popupTitleIn.classList.add('active');
                    }


                    cabinetBtn.forEach(function (item) {
                        item.classList.remove('active')
                    })

                    cabinetTab.forEach(function (item) {
                        item.classList.remove('active')
                    })
                    item.classList.add('active');
                    currentTab.classList.add('active');

                });
            });
        }
    }
    popupTabs();

    // tabs
    function tabs(btnOpenTab, bookBark, tabAttr) {
        const tabBtn = document.querySelectorAll(`.${btnOpenTab}`);
        const tabItem = document.querySelectorAll(`.${bookBark}`);
        if (tabItem) {
            tabBtn.forEach((item) => {
                item.addEventListener('click', function () {
                    let tabId = item.getAttribute(tabAttr);
                    let currentTab = document.querySelector(tabId);

                    tabBtn.forEach(function (item) {
                        item.classList.remove('active')
                    })

                    tabItem.forEach(function (item) {
                        item.classList.remove('active')
                    })
                    item.classList.add('active');
                    currentTab.classList.add('active');

                });
            });
        }
    }
    tabs("sidebar-btn", "sidebar-tab", "data-tab");


    // активация кнопки регистарции  Create account
    function activeBtnCreateAccount() {
        let sample = document.querySelectorAll('.sample');
        let fillName = document.querySelector('.fill-name');
        let email = document.querySelector('.--email');
        let phone = document.querySelector('.phone');
        let pwd = document.querySelector('.pwd-conf-1');
        let pwdTwo = document.querySelector('.pwd-conf-2');
        let popupLinkTwo = document.querySelector('.popup-link-two');
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (popupLinkTwo) {
            sample.forEach((item) => {
                item.addEventListener('keyup', () => {
                    if (fillName.value != '' && phone.value != '' && pwd.value != '' && pwdTwo.value != '' && pwdTwo.value === pwd.value) {
                        if (reg.test(email.value)) {
                            popupLinkTwo.classList.remove('--deactive')
                        }
                    } else {
                        email.addEventListener('keyup', () => {
                            if (!reg.test(email.value)) {
                                popupLinkTwo.classList.add('--deactive')
                            }
                        })

                    }
                })
            })
        }
    }
    activeBtnCreateAccount();
    // проверка ввода одинаковых паролей
    function confPwd(inpPwd, inpPwdTwo) {
        let pwd = document.querySelector(`.${inpPwd}`);
        let pwdTwo = document.querySelector(`.${inpPwdTwo}`);
        let inputPassword = document.querySelectorAll('.input-password');
        inputPassword.forEach((item) => {
            item.addEventListener("keyup", () => {
                if (pwd.value != pwdTwo.value) {
                    pwdTwo.classList.add("error")
                    pwd.classList.add("error")
                } else if (pwd.value == pwdTwo.value) {
                    pwdTwo.classList.remove("error")
                    pwd.classList.remove("error")
                }
            })
        })
    }
    confPwd('pwd-conf-1', 'pwd-conf-2');
    confPwd('pwd-conf-one', 'pwd-conf-two');

    // активация форм ввода данных карт
    function paymentCard() {
        let paymentLabelRadio = document.querySelectorAll('.payment__label-radio');

        if (paymentLabelRadio) {
            paymentLabelRadio.forEach((item) => {
                item.addEventListener('click', () => {
                    let paymentBoxHead = document.querySelectorAll('.payment-box-head');
                    paymentBoxHead.forEach((item) => {
                        item.classList.remove('--active');
                    })

                    item.parentElement.parentElement.classList.add('--active')

                })
            })

        }
    }
    paymentCard();

})

