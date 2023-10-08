window.addEventListener('load', () => {

  // Чтобы при перезагрузке страницы она начиналась с самого верха
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  // приветствие с задержкой анимации
  function showBoxTitleByTime(selector, time) {
    const loadHello = setTimeout(() => {
      document.querySelector(selector).classList.add('show');
      clearTimeout(loadHello);
    }, time);
  }


  $(window).scroll(function (event) {
    var s = $(this).scrollTop(); //px по высоте, прокрученные в окне браузера
    // console.log('scroll страницы: ', s);
    // console.log(`this ${s}`)
    var w = $(this).outerWidth(); // получить ширину окна браузера, чтобы на неё опираться
    // console.log('width окна браузера: ', w);
    var h = $('.content').outerHeight(); // получить высоту контентной части
    // console.log('height контентной части: ', h);
    var h_b = $('.parallax').outerHeight(); // высота верхнего блока
    // console.log('h_b: высота верхнего блока ', h_b);

    // ниже вычисление % процентов прокрутки всей контентной части
    var p = (s / h) * 100;
    // console.log('p: % прокрутки всей контентной части', p);
    // ниже вычисление % процентов прокрутки только верхней части
    var p_b = (s / h_b) * 100;
    // console.log('p_b: % процентов прокрутки только верхней части', p_b);
    // ниже вычисляем будущую НЕпрозрачность
    var o = 1 - (1 / 100) * p_b;
    // console.log('o: будущая НЕпрозрачность', o);

    //todo  теперь приступаем непосредственно к Parallax:
    var z_1 = 1 + (w / 10000) * p_b;
    $('.parallax__fog').css('transform', 'scale(' + z_1 + ')'); //? движение тумана
    $('.parallax__fog').css('opacity', o); //? прозрачность тумана

    // todo  ниже движение всех гор
    var z_2 = 1 + (w / 500000) * p; /// 500000 - заранее просто подобранное число
    $('.parallax__mountain-1').css('transform', 'scale(' + z_2 + ')'); //? гора на фоне движется

    var hr = (w / 2000) * p_b;
    var z_3 = 1 + w * 0.000005 * p_b;
    $('.parallax__mountain-2').css(
      'transform',
      'translate3d(' + hr + 'px, 0, 0) scale(' + z_3 + ')'
    ); //? гора справа

    var hr_2 = (w / 1500) * p_b;
    var z_4 = 1 + w * 0.00001 * p_b;
    $('.parallax__mountain-3').css(
      'transform',
      'translate3d(' + hr_2 + 'px, 0, 0) scale(' + z_4 + ')'
    ); //? гора слева
  });

  //todo auto scrolling with timeout
  function startScroll() {
    let intervalId1 = setInterval(function () {
      window.scrollBy(0, 10);
      if (scrollY >= 20) {
        clearInterval(intervalId1);
        clearTimeout(startTimeoutId);
      }
    }, 40);
  }

  function scrollFog() {
    let intervalId2 = setInterval(function () {
      window.scrollBy(0, 10);
      // if (scrollY >= 80) {
        if (scrollY >= document.body.scrollHeight / 8) {
          clearInterval(intervalId2);
          clearTimeout(fogTimeoutId);
        }
    }, 50);
  }

  function scrollMountains() {
    let intervalId3 = setInterval(function () {
      window.scrollBy(0, 5);
      // window.scrollTo({
      //   top: document.querySelector('.content').offsetTop,
      //   behavior: 'smooth',
      // });
      if (scrollY >= document.querySelector('.content').offsetTop - 5) {
        clearInterval(intervalId3);
        clearTimeout(mountainsTimeoutId);
      }
    }, 15);
  }

  showBoxTitleByTime('.parallax__box', 1000);

  let startTimeoutId = setTimeout(startScroll, 3800);
  let fogTimeoutId = setTimeout(scrollFog, 4800);
  let mountainsTimeoutId = setTimeout(scrollMountains, 5000);

  console.log(window.scrollY); // не забыл, нужно для теста, на сколько пикселей страница scrolled down
});
