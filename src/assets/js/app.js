//= components/jquery.min.js
//= components/jquery.magnific-popup.min.js
//= components/jquery.mCustomScrollbar.js
//= components/slick.min.js

// calendar active day

function calendarActiveDay() {
    let calendarDay = document.querySelectorAll('.calendar__day');
    if (calendarDay) {
        calendarDay.forEach((item) => {
            item.addEventListener('click', function () {
                item.classList.toggle('active');
            })
        })
    }
};
calendarActiveDay();
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
        }

        function selectChoose() {
            let text = this.innerText;
            let select = this.closest('.select');
            let currentText = select.querySelector(".select__current");
            currentText.innerText = text;
            select.classList.remove('is-active');
        }
    }

}
select();

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
            closeAllLists();
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
        });
    }
}





// data kalendae


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

$(window).on("load", function () {
    $(".time__box").mCustomScrollbar();



});

// slick
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


