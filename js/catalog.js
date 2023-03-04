// SELECT REGION
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
  // Catalog Page
  //Функция добавление выбранных фильтров у заголовка
function addOrRemoveCategory(el, type, array = []) {
  let container = document.createElement('span');
  container.classList.add('catalog-page__category-cell');
  if (type === 'category') {
    container.style.backgroundColor = '#DAFFD1'
  }
  if (type === 'discount') {
    container.style.backgroundColor = '#EBD1FF'
  }
  if (type === 'color') {
    container.style.backgroundColor = '#EAEAEA'
  }


  let btn = document.createElement('button');
  btn.classList.add('catalog-page__category-btn');
  btn.classList.add('button-default');
  btn.setAttribute('aria-label', 'Кнопка закрытия тега');


  if ((type === 'category') || (type === 'discount') || (type === 'color')) {
    let input = el.querySelector('input');
    if (input.checked) {
      container.textContent = el.textContent.trim();
      if (type === 'discount') {
        if (el.textContent.trim() === 'Не важно') {
          container.textContent = 'Без скидки';
        }
        if (el.textContent.trim() === 'Менее 5 000') {
          container.textContent = 'Скидка меньше 5 000';
        }
        if (el.textContent.trim() === 'Более 5 000') {
          container.textContent = 'Скидка больше 5 000';
        }
      }
      btn.addEventListener('click', () => {
        btn.closest('span').remove();
        el.querySelector('input').checked = !el.querySelector('input').checked;

      })
      container.append(btn);
      document.querySelector('.catalog-page__title-container').append(container);
    } else {
      document.querySelectorAll('.catalog-page__category-cell').forEach(item => {

        if (type === 'discount') {
          let findEl;
          if (el.textContent.trim() === 'Не важно') {
            findEl = 'Без скидки';
          }
          if (el.textContent.trim() === 'Менее 5 000') {
            findEl = 'Скидка меньше 5 000';
          }
          if (el.textContent.trim() === 'Более 5 000') {
            findEl = 'Скидка больше 5 000';
          }

          if (item.textContent === findEl) {
            item.remove();
          }
        } else {
          if (item.textContent === el.textContent.trim()) {
            item.remove();
          }
        }


      })
    }
  }
  if (type.includes('price')) {
    container.style.backgroundColor = '#FFF5D1';
    if (type.includes('max')) {
      container.setAttribute('data-category', 'price-max');
      if (document.querySelector('[data-category="price-max"]')) {
        document.querySelector('[data-category="price-max"]').remove();
      }
      container.textContent = `До ${el}`;
    }
    if (type.includes('min')) {
      container.setAttribute('data-category', 'price-min');
      if (document.querySelector('[data-category="price-min"]')) {
        document.querySelector('[data-category="price-min"]').remove();
      }
      container.textContent = `От ${el}`;
    }

    btn.addEventListener('click', () => {
      btn.closest('span').remove();
    })


    container.append(btn);
    document.querySelector('.catalog-page__title-container').append(container);
  }
}

const btnCategory = document.createElement('button');
btnCategory.classList.add('filter__btn');
btnCategory.classList.add('button-default');
btnCategory.setAttribute('data-target', 'category');
btnCategory.setAttribute('type', 'button')
const checkBoxCategory = document.querySelectorAll('[data-label="category"]');
btnCategory.textContent = `+ ещё ${checkBoxCategory.length-9}`;
checkBoxCategory[checkBoxCategory.length - 1].insertAdjacentElement('afterend', btnCategory);
btnCategory.addEventListener('click', () => {
  for (let i = 9; i < checkBoxCategory.length; i++) {
    checkBoxCategory[i].classList.toggle('filter__label-hide');
  }
  if (btnCategory.textContent === `+ ещё ${checkBoxCategory.length-9}`) {
    btnCategory.textContent = 'Скрыть';
  } else {
    btnCategory.textContent = `+ ещё ${checkBoxCategory.length-9}`;
  }
})
checkBoxCategory.forEach(item => {
  let input = item.querySelector('input');
  if (input.checked) {
    addOrRemoveCategory(item, 'category', checkBoxCategory);
  }
  input.addEventListener('change', () => {
    if (input.checked) {
      addOrRemoveCategory(item, 'category', checkBoxCategory);
    } else {
      let container = document.querySelector('.catalog-page__title-container');
      let categoryDiv = container.querySelectorAll('.catalog-page__category-cell');
      categoryDiv.forEach(el => {
        if (el.textContent === item.textContent.trim()) {
          el.remove();
        }
      })

    }

  })
})




const btnColor = document.createElement('button');
btnColor.classList.add('filter__btn');
btnColor.classList.add('filter__btn--margin');
btnColor.classList.add('button-default');
btnColor.setAttribute('data-target', 'color');
btnColor.setAttribute('type', 'button');
const checkBoxColor = document.querySelectorAll('[data-label="color"]');
btnColor.textContent = `+ ещё ${checkBoxColor.length-9}`;
checkBoxColor[checkBoxColor.length - 1].insertAdjacentElement('afterend', btnColor);
btnColor.addEventListener('click', () => {
  for (let i = 9; i < checkBoxColor.length; i++) {
    checkBoxColor[i].classList.toggle('filter__label-hide');
  }
  if (btnColor.textContent === `+ ещё ${checkBoxColor.length-9}`) {
    btnColor.textContent = 'Скрыть';
  } else {
    btnColor.textContent = `+ ещё ${checkBoxColor.length-9}`;
  }
})


//Range
let range = document.getElementById('range');

noUiSlider.create(range, {

  range: {
    'min': 0,
    'max': 200000
  },
  start: [2000, 150000],
  connect: true,
  tooltips: true
});

//enter value input 
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');
priceMin.addEventListener('input', () => {
  range.noUiSlider.set([priceMin.value, null]);
})
priceMax.addEventListener('input', () => {
  range.noUiSlider.set([null, priceMax.value]);

})
let leftValue;
let rightValue;
let count = 0;

range.noUiSlider.on('update', function(values, handle) {
  priceMin.value = Math.round(values[0]);
  priceMax.value = Math.round(values[1]);

  if ((values[0] != leftValue) && (count > 1)) {
    leftValue = values[0];
    document.querySelector('.noUi-handle-lower').querySelector('.noUi-tooltip').textContent = 'От ' + document.querySelector('.noUi-handle-lower').querySelector('.noUi-tooltip').textContent;
    addOrRemoveCategory(priceMin.value, 'price-min');
  } else {
    count++;
  }
  if (values[1] != rightValue) {
    rightValue = values[1];
    document.querySelector('.noUi-handle-upper').querySelector('.noUi-tooltip').textContent = 'До ' + document.querySelector('.noUi-handle-upper').querySelector('.noUi-tooltip').textContent;
    addOrRemoveCategory(priceMax.value, 'price-max');
  }
})

const checkBoxDiscount = document.querySelectorAll('[data-label="discount"]');
checkBoxDiscount.forEach(item => {
  let input = item.querySelector('input');
  if (input.checked) {
    addOrRemoveCategory(item, 'discount', checkBoxDiscount);
  }
  input.addEventListener('change', () => {
    if (input.checked) {
      addOrRemoveCategory(item, 'discount', checkBoxDiscount);
    } else {
      let container = document.querySelector('.catalog-page__title-container');
      let categorySpan = container.querySelectorAll('.catalog-page__category-cell');

      categorySpan.forEach(el => {
        let findCheckBox = '';

        if (el.textContent === 'Без скидки') {
          findCheckBox = 'Не важно';
        }
        if (el.textContent === 'Скидка меньше 5 000') {
          findCheckBox = 'Менее 5 000';
        }
        if (el.textContent === 'Скидка больше 5 000') {
          findCheckBox = 'Более 5 000';
        }
        if (el.textContent === '< 5 000') {
          findCheckBox = '< 5 000';
        }
        if (el.textContent === '> 5 000') {
          findCheckBox = '> 5 000';
        }

        if (findCheckBox === item.textContent.trim()) {
          el.remove();
        }
      })

    }

  })
})

checkBoxColor.forEach(item => {
    let input = item.querySelector('input');
    if (input.checked) {
      addOrRemoveCategory(item, 'color', checkBoxColor);
    }
    input.addEventListener('change', () => {
      if (input.checked) {
        addOrRemoveCategory(item, 'color', checkBoxColor);
      } else {
        let container = document.querySelector('.catalog-page__title-container');
        let categorySpan = container.querySelectorAll('.catalog-page__category-cell');
        categorySpan.forEach(el => {
          if (el.textContent === item.textContent.trim()) {
            el.remove();
          }
        })

      }

    })
  })
  // ACTIVE/FOCUS noUIslider
const leftHande = document.querySelector('.noUi-handle-lower');
const rightHande = document.querySelector('.noUi-handle-upper');
leftHande.addEventListener('mousedown', () => {
  document.querySelector('.noUi-connect').classList.add('noUi-connect--active');
})
leftHande.addEventListener('focus', () => {
  document.querySelector('.noUi-connect').classList.add('noUi-connect--active');
})
leftHande.addEventListener('blur', () => {
  document.querySelector('.noUi-connect').classList.remove('noUi-connect--active');
})
rightHande.addEventListener('mousedown', () => {
  document.querySelector('.noUi-connect').classList.add('noUi-connect--active');
})
rightHande.addEventListener('focus', () => {
  document.querySelector('.noUi-connect').classList.add('noUi-connect--active');
})
rightHande.addEventListener('blur', () => {
  document.querySelector('.noUi-connect').classList.remove('noUi-connect--active');
})


//TAB CONTENT
function createTabDesktop() {
  const tabBtn1 = document.querySelector('[data-tabbtn="1"]');
  const tabBtn2 = document.querySelector('[data-tabbtn="2"');
  const tabContent1 = document.querySelectorAll('[data-tab="first"]');
  const tabContent2 = document.querySelectorAll('[data-tab="second"]');

  tabBtn2.addEventListener('click', () => {
    tabContent1.forEach(item => {
      item.classList.add('catalog-card--display');
    })
    tabContent2.forEach(item => {
      item.classList.remove('catalog-card--display');
    })
    tabBtn1.classList.remove('content__btn--active');
    tabBtn2.classList.add('content__btn--active');
    tabBtn2.blur();
  })

  tabBtn1.addEventListener('click', () => {
    tabContent2.forEach(item => {
      item.classList.add('catalog-card--display');
    })
    tabContent1.forEach(item => {
      item.classList.remove('catalog-card--display');
    })
    tabBtn2.classList.remove('content__btn--active');
    tabBtn1.classList.add('content__btn--active');
    tabBtn1.blur();
  })
}

function createTabTablet() {
  const tabBtnTablet1 = document.querySelector('[data-tabbtn="1"]');
  const tabBtnTablet2 = document.querySelector('[data-tabbtn="2"');
  const tabBtnTablet3 = document.querySelector('[data-tabbtn="3"');
  const tabContentTablet1 = document.querySelectorAll('[data-tab-mobile="first"]');
  const tabContentTablet2 = document.querySelectorAll('[data-tab-mobile="second"]');
  const tabContentTablet3 = document.querySelectorAll('[data-tab-mobile="third"]');

  tabBtnTablet2.addEventListener('click', () => {
    document.querySelectorAll('.catalog-card').forEach(item => {
      item.classList.add('catalog-card--display-mobile');
    })
    tabContentTablet2.forEach(item => {
      item.classList.remove('catalog-card--display-mobile');
    })
    document.querySelector('.content__btn--active').classList.remove('content__btn--active');
    tabBtnTablet2.classList.add('content__btn--active');
    tabBtnTablet2.blur();
  })
  tabBtnTablet3.addEventListener('click', () => {
    document.querySelectorAll('.catalog-card').forEach(item => {
      item.classList.add('catalog-card--display-mobile');
    })
    tabContentTablet3.forEach(item => {
      item.classList.remove('catalog-card--display-mobile');
    })
    document.querySelector('.content__btn--active').classList.remove('content__btn--active');
    tabBtnTablet3.classList.add('content__btn--active');
    tabBtnTablet3.blur();
  })
  tabBtnTablet1.addEventListener('click', () => {
    document.querySelectorAll('.catalog-card').forEach(item => {
      item.classList.add('catalog-card--display-mobile');
    })
    tabContentTablet1.forEach(item => {
      item.classList.remove('catalog-card--display-mobile');
    })
    document.querySelector('.content__btn--active').classList.remove('content__btn--active');
    tabBtnTablet1.classList.add('content__btn--active');
    tabBtnTablet1.blur();
  })
}
const screenWidth = window.screen.width;
if (screenWidth > 1006) {
  createTabDesktop();
} else {
  createTabTablet();
}




// SELECT WITH CHECKBOX
const btnSelectFilter = document.querySelectorAll('.filter__checkbox-btn');
btnSelectFilter.forEach(item => {
  item.addEventListener('click', () => {
    const container = item.closest('div');
    const droplist = container.querySelector('.filter__checkbox-container');
    if ((document.querySelector('.filter__checkbox-btn--active')) && (document.querySelector('.filter__checkbox-btn--active') != item)) {

      document.querySelector('.filter__checkbox-btn--active').classList.remove('filter__checkbox-btn--active');
    }
    if ((document.querySelector('.filter__checkbox-container--active')) && (document.querySelector('.filter__checkbox-container--active') != droplist)) {
      document.querySelector('.filter__checkbox-container--active').classList.remove('filter__checkbox-container--active');
    }
    item.classList.toggle('filter__checkbox-btn--active');

    droplist.classList.toggle('filter__checkbox-container--active')
  })
})