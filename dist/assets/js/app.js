

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