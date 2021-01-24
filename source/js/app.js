const icon = document.querySelector('.user-list__icon--cart');
const text = document.querySelector('.user-list__item--cart');

function cartHover() {
  if (icon && text) {
    icon.classList.toggle('user-list__icon--hover');
    text.classList.toggle('user-list__icon--hover');
  }
}

function load() {
  if (icon && text) {
    icon.addEventListener('mouseover', cartHover, false);
    icon.addEventListener('mouseout', cartHover, false);

    text.addEventListener('mouseover', cartHover, false);
    text.addEventListener('mouseout', cartHover, false);
  }
}

window.addEventListener('load', load, false);
