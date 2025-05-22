import carsData from './constants/carsData.js'
import DOM from './dom.js';

const burgerButton = document.querySelector(".nav_mobile .burgerButton")
burgerButton.addEventListener("click", () => {
  const burgerLink = document.querySelector(".nav_mobile .links");
  burgerLink.classList.toggle("hide");
});

for (let i = 0; i < carsData.length; ++i) {
  const cars = DOM.GE("#rentCar .cars");
  const carDOM = createCarDOM(carsData[i]);
  cars.appendChild(carDOM);
}

function createCarDOM(carData) {
  const carDOM = DOM.CE('div', 'car');
  const imgDOM = DOM.img(`assets/img/${carData.images[0]}`, "car_image", "image", carDOM);

  const circlesDOM = createCircle(imgDOM, carData.images);
  carDOM.appendChild(circlesDOM);

  const infoDOM = createInfoDOM(carData.logo, carData.mark, carData.details);
  carDOM.appendChild(infoDOM);

  const priceContainerDOM = DOM.CE("div", "priceContainer");
  priceContainerDOM.innerHTML = `<p>${carData.price} $ <sup>/day</sup></p>`;
  carDOM.appendChild(priceContainerDOM);

  const linkDOM = DOM.link("#contacts", "Rent", null, carDOM);
  linkDOM.classList.add("button");

  return carDOM;
}

function createCircle(imgDOM, carImages) {
  const circlesDOM = DOM.CE("div", "circlener");

  const leftCircleDOM = DOM.CE("div", "circle", circlesDOM);
  DOM.CE("div", ["circle", "circle_mec"], circlesDOM);
  const rightCircleDOM = DOM.CE("div", "circle", circlesDOM);

  const MAX_SLIDE_IND = carImages.length - 1;

  const imgSrcChange = (i) => {
    imgDOM.src = `assets/img/${carImages[i]}`;
  }

  let index = 0;

  leftCircleDOM.addEventListener("click", () => {
    if (index === 0) {
      index = MAX_SLIDE_IND;
    } else {
      --index;
    }

    imgSrcChange(index);
  });

  rightCircleDOM.addEventListener("click", () => {
    if (index === MAX_SLIDE_IND) {
      index = 0;
    } else {
      ++index;
    }

    imgSrcChange(index);
  });

  return circlesDOM;
}

function createInfoDOM(logo, mark, details) {
  const infoDOM = DOM.CE("div", 'info');
  DOM.img(`assets/img/${logo}`, 'car_mark', 'carMark', infoDOM);

  const boxDOM = DOM.CE('div');
  const markDOM = DOM.CE('p', 'mark', boxDOM);
  markDOM.innerText = mark;
  const detailsDOM = DOM.CE('p', 'carInfo', boxDOM);
  detailsDOM.innerText = details;

  infoDOM.appendChild(boxDOM);

  return infoDOM;
}