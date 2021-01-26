const icon = document.querySelector('.nav__list-icon--cart');
const text = document.querySelector('.nav__list-item--cart');
const orderButtons = document.querySelectorAll('.bestseller__button, .catalog__button');
const modal = document.querySelector('.modal');

function cartHover() {
  if (icon && text) {
    icon.classList.toggle('nav__list-icon--hover');
    text.classList.toggle('nav__list-icon--hover');
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


function initMap() {
  var map = new google.maps.Map(
      document.getElementById('map'), {
          center: new google.maps.LatLng(59.938883, 30.323546),
          zoom: 18
      });

  var mapPin = {
      position: new google.maps.LatLng(59.938883, 30.323546),
      type: 'info'
  };

  new google.maps.Marker({
      position: mapPin.position,
      map: map
  });
}
