const burgerButton = document.querySelector(".nav_mobile .burgerButton")
burgerButton.addEventListener("click", () => {
  const burgerLink = document.querySelector(".nav_mobile .links");
  burgerLink.classList.toggle("hide");
});

document.addEventListener("readystatechange", () => {
  addSliderLogic();
});

function addSliderLogic() {
  document.querySelectorAll('.galleryWrapper').forEach(wrapper => {
    const gallery = wrapper.querySelector('.gallery');
    const container = wrapper.querySelector('.images');
    const dotsContainer = wrapper.querySelector('.dots');
    const imgWidth = wrapper.querySelector("img").width;
    const totalImages = container.children.length;

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let dragDiff = 0;

    // Create dots dynamically
    for (let i = 0; i < totalImages; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateView();
      });
    }

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateView() {
      container.style.transition = 'transform 0.3s ease';
      container.style.transform = `translateX(${-currentIndex * imgWidth}px)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    // Pointer Events for mouse + touch + pen unified handling
    gallery.addEventListener('pointerdown', e => {
      isDragging = true;
      startX = e.clientX;
      dragDiff = 0;
      container.style.transition = 'none';

      // Capture pointer to track outside gallery
      gallery.setPointerCapture(e.pointerId);
    });

    gallery.addEventListener('pointermove', e => {
      if (!isDragging) return;
      dragDiff = e.clientX - startX;
      container.style.transform = `translateX(${-currentIndex * imgWidth + dragDiff}px)`;
    });

    gallery.addEventListener('pointerup', e => {
      if (!isDragging) return;
      isDragging = false;

      if (dragDiff > 60 && currentIndex > 0) {
        currentIndex--;
      } else if (dragDiff < -60 && currentIndex < totalImages - 1) {
        currentIndex++;
      }
      updateView();

      // Release pointer capture
      gallery.releasePointerCapture(e.pointerId);
    });

    gallery.addEventListener('pointercancel', e => {
      isDragging = false;
      updateView();
    });

    // Wheel event to detect 2-finger horizontal swipe on touchpad (not perfect, but works)
    gallery.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault(); // Հորիզոնական scroll-ը կասեցնել
        if (e.deltaX > 30 && currentIndex < totalImages - 1) {
          currentIndex++;
          updateView();
        } else if (e.deltaX < -30 && currentIndex > 0) {
          currentIndex--;
          updateView();
        }
      }
    }, { passive: false });

    updateView();
  });
}