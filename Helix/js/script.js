//Scroll to map
$('.header__contacts-map').on('click', function () {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 600,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });

    return false;
});


// Swiper Banners 
var swiperBanners = new Swiper(".swiper-banners", {

    navigation: {
        nextEl: ".swiper-banners .swiper-button-next",
        prevEl: ".swiper-banners .swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + /* (index + 1) + */ "</span>";
        },
    },
});


// Swiper Doctors
var swiperLicenses = new Swiper(".swiper-licenses", {
    slidesPerView: 5,
    spaceBetween: 30,
    navigation: {
        nextEl: ".licenses .swiper-button-next",
        prevEl: ".licenses .swiper-button-prev",
    },
});


//Tabs

const tabs = document.querySelectorAll('.tabs')

if (tabs.length > 0) {
    tabs.forEach(element => {
        const tabsControls = element.querySelector('.tabs__controls')
        const tabsInputs = tabsControls.querySelectorAll('input')
        const tabsContent = element.querySelector('.tabs__content')
        const tabsTab = tabsContent.querySelectorAll('.tabs__tab')

        tabsInputs.forEach((input, ind, arr) => {
            if (input.checked) {
                input.parentNode.classList.add('label--active')
                tabsTab.forEach(tab => {
                    if (tab.dataset.pointer === input.id) tab.classList.add('tabs__tab_active')
                })
            }

            input.addEventListener('click', () => {
                arr.forEach(el => el.parentNode.classList.remove('label--active'))
                tabsTab.forEach(el => {
                    el.classList.remove('tabs__tab_active')
                    if (el.dataset.pointer === input.id) el.classList.add('tabs__tab_active')
                })
                input.parentNode.classList.add('label--active')
            })
        })
    })
}


// Левое меню 

const leftMenu = document.querySelector('.left-menu')
if (leftMenu) {
    const leftMenuItems = leftMenu.querySelectorAll('.left-menu__item_dropdown');
    leftMenuItems.forEach(li => {
        const prevEl = li.previousElementSibling;
        li.querySelector('.left-menu__link').addEventListener('click', e => e.preventDefault())
        li.addEventListener('click', () => {
            li.classList.toggle('open')
            li.classList.contains('open') && prevEl ? prevEl.querySelector('.left-menu__link').style.borderBottom = "0" : prevEl.querySelector('.left-menu__link').style.borderBottom = "1px solid rgba(196, 220, 196, 0.6)"
        })

    })
}


/* Spoiler */
const spoilers = document.querySelectorAll('.spoiler')
if (spoilers.length > 0) {
    spoilers.forEach(spoiler => {
        const items = spoiler.querySelectorAll('.spoiler__item')
        items.forEach((item, ind, arr) => {
            item.querySelector('.spoiler__top').addEventListener('click', (e) => {
                item.classList.toggle('open')
            })
        })
    })
}


// Popups
class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closeButton = this._popupElement.querySelector('.popup__close');
        this._img = this._popupElement.id === "photo" ? this._popupElement.querySelector('.popup__img') : null;
        this._handleEscClose = this._handleEscClose.bind(this)
        this.openingLinks = document.querySelectorAll(`[data-pointer="${this._popupElement.id}"]`)
        this.setEventListeners()
    }

    open(el) {
        if (this._img) this._img.src = el.src
        document.body.style.overflow = "hidden";
        this._popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        if (this._img) this._img.src = ""
        this._popupElement.classList.remove('popup_opened');
        document.body.style.overflow = "visible";
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this.openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
        this._closeButton.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}

const popups = document.querySelectorAll('.popup')

if (popups.length > 0) popups.forEach(item => new Popup(item))

// Mask phone
$(function(){
    $("#phone").mask("+7 999 999-9999");
  });


//Яндекс карты

/* Яндекс карты */
ymaps.ready(init);

const addresses = [
    {
        id: "1",
        coordinates: [57.158492, 65.552467],
        title: "Дц на Свердлова",
        adress: "г. Тюмень, улица Свердлова, 5к1",
    },
    {
        id: "2",
        coordinates: [57.161763, 65.494850],
        title: "Дц на Ямской",
        adress: "г. Тюмень, Ямская улица, 86",
    },
    {
        id: "3",
        coordinates: [57.171181, 65.555510],
        title: "Дц на Газовиков",
        adress: "г. Тюмень, улица Газовиков, 61",
    },
    {
        id: "4",
        coordinates: [57.146266, 65.552662],
        title: "Дц на Республики",
        adress: "г. Тюмень, улица Республики, 86к1",
    },
    {
        id: "5",
        coordinates: [57.108818, 65.573952],
        title: "Дц на Гольцова",
        adress: "г. Тюмень, улица Василия Гольцова, 10",
    },
    {
        id: "6",
        coordinates: [57.098054, 65.586601],
        title: "Дц на Монтажников",
        adress: "г. Тюмень, улица Монтажников, 61",
    },
    {
        id: "7",
        coordinates: [57.114159, 65.553421],
        title: "Дц на Менделеева",
        adress: "г. Тюмень, улица Дмитрия Менделеева, 5",
    },

    //Университетская или Ленина?
    {
        id: "8",
        coordinates: [57.159395, 65.523845],
        title: "Дц на Ленина",
        adress: "г. Тюмень, ул. Ленина, 12",
    },
];

function init() {
    // Создание карты.
    var myMap = new ymaps.Map(
        "map",
        {
            center: [57.155719, 65.550156],
            zoom: 12,
            controls: [],
        },
        {
            searchControlProvider: "yandex#search",
        }
    ),

        BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            `<div class="map__info">
                <p class="map__info-title">{{properties.title}}</p>   
                <div class="map__info-row">
                    <svg>
                        <use href="./img/icons/icons.svg#map-location"></use>
                    </svg>
                    <p>{{properties.adress}}</p>
                </div>
                <a href="tel:+73452355560" class="phone">
                    <svg>
                        <use href="./img/icons/icons.svg#phone"></use>
                    </svg>
                    <p> 8 (3452) <span>35-55-60</span></p>
                </a>
            </div>`
        );

    addresses.forEach(
        ({ adress, title, coordinates, id }, ind) => {
            myPlacemarkWithContent = new ymaps.Placemark(
                coordinates,
                {
                    adress,
                    title
                },
                {
                    iconImageHref: "./img/map-icon.svg",
                    iconImageSize: [55, 60],
                    iconLayout: "default#imageWithContent",
                    iconContentOffset: [12.5, 10],
                    iconImageOffset: [-25, 10],
                    balloonContentLayout: BalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    hideIconOnBalloonOpen: false,
                }
            );

            myMap.geoObjects.add(myPlacemarkWithContent);


            const links = document.querySelectorAll('.maps .list-item a')
            const link = document.querySelector(`[data-map="${id}"]`)

            const handleClass = () => {
                links.forEach(item => item.classList.remove('active'))
                link.classList.add('active')
            }

            link.addEventListener('click', () => {
                myMap.geoObjects.get(ind).balloon.open()
                handleClass()
            })

            myPlacemarkWithContent.events.add('click', handleClass)
        }
    );

}