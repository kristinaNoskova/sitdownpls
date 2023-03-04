const selectRegion = document.querySelector('.region__select');
const choices = new Choices(selectRegion, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
});
//SELECT CATEGORY
const selectCategory = document.querySelector('.category__select');
const choicesCategory = new Choices(selectCategory, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,

});
// Открытие меню (бургер)
const burgerBtn = document.querySelector('.header__burger');
const crossMenu = document.querySelector('.header__nav-btn');
const headerNav = document.querySelector('.header__nav');
const addMenu = document.querySelector('.addmenu');
burgerBtn.addEventListener('click', () => {
  headerNav.classList.add('header__nav-active');
  addMenu.classList.add('addmenu-active');
})
crossMenu.addEventListener('click', () => {
  headerNav.classList.remove('header__nav-active');
  addMenu.classList.remove('header__addmenu-active');
})

//Карта
ymaps.ready(init);

function init() {

  var myMap = new ymaps.Map("map", {
    center: [55.750615568993275, 37.64180899999995],
    // от 0 (весь мир) до 19.
    zoom: 14
  });
  myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('searchControl'); // удаляем поиск
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove('rulerControl'); // удаляем контрол правил
  myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  myPoints = [
    { coords: [55.75436477720211, 37.633885499999984], header: '<h2 class="map__title h-reset">SitDownPls на Солянке</h2>', body: '<div class="map__container"><span class="map__address">м. Китай-город, ул. Солянка, д.24</span><a class="map__tel" href="tel:74958854547" aria-label="Телефон интернет-магазина"><svg class="map__tel-svg-container"><use class="map__tel-svg-use" xlink:href="svg/sprite.svg#phone"></use></svg> +7 (495) 885-45-47 </a> <span class="map__time"><span class="map__chart">Часы работы:</span> с 10:00 до 21:00</span><p class="map__discribe p-reset"><span class="map__discribe--color">Что здесь:</span> шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</p></div>' },
    { coords: [55.758468277184775, 37.65876049999999], header: '<h2 class="map__title h-reset">SitDownPls на Покровке</h2>', body: '<div class="map__container"><span class="map__address">м. Курская, ул. Покровка, д.14</span><a class="map__tel" href="tel:74958854547" aria-label="Телефон интернет-магазина"><svg class="map__tel-svg-container"><use class="map__tel-svg-use" xlink:href="svg/sprite.svg#phone"></use></svg> +7 (495) 885-45-47 </a> <span class="map__time"><span class="map__chart">Часы работы:</span> с 10:00 до 21:00</span><p class="map__discribe p-reset"><span class="map__discribe--color">Что здесь:</span> шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</p></div>' },
  ];

  var find = function(arr, find) {
    return arr.filter(function(value) {
      value = value.header;
      let index = value.indexOf('>', 0);
      let t = value.slice(0, index + 1);
      value = value.replace(t, '');
      t = 'Москва, ';
      value = value.replace('</h2>', '');
      value = t + value;
      return (value + "").toLowerCase().indexOf(find.toLowerCase()) != -1;
    });
  };
  var myProvider = {
    suggest: function(request, options) {
      var res = find(myPoints, request),
        arrayResult = [],
        results = Math.min(options.results, res.length);
      for (var i = 0; i < results; i++) {

        let value = res[i].header;
        let index = value.indexOf('>', 0);
        let t = value.slice(0, index + 1);
        value = value.replace(t, '');
        t = 'Москва, ';
        value = value.replace('</h2>', '');
        value = t + value;


        arrayResult.push({ displayName: value, value: value })
      }
      return ymaps.vow.resolve(arrayResult);
    }
  }
  var suggestView1 = new ymaps.SuggestView('suggest', { provider: myProvider, results: 3 })
  var myPlacemark = new ymaps.Placemark(
    [55.75436477720211, 37.633885499999984], {
      balloonContentHeader: '<h2 class="map__title h-reset">SitDownPls на Солянке</h2>',
      balloonContentBody: '<div class="map__container"><span class="map__address">м. Китай-город, ул. Солянка, д.24</span><a class="map__tel" href="tel:74958854547" aria-label="Телефон интернет-магазина"><svg class="map__tel-svg-container"><use class="map__tel-svg-use" xlink:href="svg/sprite.svg#phone"></use></svg> +7 (495) 885-45-47 </a> <span class="map__time"><span class="map__chart">Часы работы:</span> с 10:00 до 21:00</span><p class="map__discribe p-reset"><span class="map__discribe--color">Что здесь:</span> шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</p></div>'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/contact/elef.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-3, -42]
    }
  )
  var myPlacemark1 = new ymaps.Placemark(
    [55.758468277184775, 37.65876049999999], {
      balloonContentBody: '<div class="map__container"><span class="map__address">м. Курская, ул. Покровка, д.14</span><a class="map__tel" href="tel:74958854547" aria-label="Телефон интернет-магазина"><svg class="map__tel-svg-container"><use class="map__tel-svg-use" xlink:href="svg/sprite.svg#phone"></use></svg> +7 (495) 885-45-47 </a> <span class="map__time"><span class="map__chart">Часы работы:</span> с 10:00 до 21:00</span><p class="map__discribe p-reset"><span class="map__discribe--color">Что здесь:</span> шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</p></div>',
      balloonContentHeader: '<h2 class="map__title h-reset">SitDownPls на Покровке</h2>'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/contact/elef.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-3, -42]
    }
  )
  myMap.geoObjects.add(myPlacemark);
  myMap.geoObjects.add(myPlacemark1);
  myPlacemark.balloon.open();


  const form = document.querySelector('.contact__form');
  const input = document.querySelector('.contact__input');
  form.addEventListener('submit', e => {

    e.preventDefault();


    switch (input.value) {

      case 'Москва, SitDownPls на Солянке':

        myPlacemark.balloon.open();



        break;

      case 'Москва, SitDownPls на Покровке':



        myPlacemark1.balloon.open();

        break;

      default:



        break;

    };
  })

}