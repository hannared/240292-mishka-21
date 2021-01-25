const icon = document.querySelector('.user-list__icon--cart');
const text = document.querySelector('.user-list__item--cart');
const orderButtons = document.querySelectorAll('.bestseller__button, .catalog__button');
const modal = document.querySelector('.modal');

function cartHover() {
  if (icon && text) {
    icon.classList.toggle('user-list__icon--hover');
    text.classList.toggle('user-list__icon--hover');
  }
}

function onOrderButtonClick(event) {
  event.preventDefault();

  if (modal) {
    modal.classList.toggle('modal--active');
  }
}

function load() {
  if (icon && text) {
    icon.addEventListener('mouseover', cartHover, false);
    icon.addEventListener('mouseout', cartHover, false);

    text.addEventListener('mouseover', cartHover, false);
    text.addEventListener('mouseout', cartHover, false);
  }

  for(let i = 0; i < orderButtons.length; i++) {
    const button = orderButtons[i];
    button.addEventListener('click', onOrderButtonClick, false);
  }
}

window.addEventListener('load', load, false);
