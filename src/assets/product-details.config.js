  var swiper = new Swiper(".product-thumb", {
    loop: true,
    spaceBetween: 12,
    slidesPerView: 4,

    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".product-prev", {
    loop: true,
    spaceBetween: 32,
    effect: "fade",

    thumbs: {
      swiper: swiper,
    },
  });