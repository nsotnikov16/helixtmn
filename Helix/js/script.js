// Swiper Banners 
var swiper = new Swiper(".swiper-banners", {

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + /* (index + 1) + */ "</span>";
        },
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

//Яндекс карты

/* Яндекс карты */
ymaps.ready(init);

const adressPharmacies = [
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

    adressPharmacies.forEach(
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