document.addEventListener('load', () => {
  // ? Чтобы при перезагрузке страницы она начиналась с самого верха
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  function showBoxTitleByTime(selector, time) {
    const loadHello = setTimeout(() => {
      document.querySelector(selector).classList.add('show');
      clearTimeout(loadHello);
    }, time);
  }

  $(window).scroll(function (event) {
    var s = $(this).scrollTop(); //px, по высоте, прокрученные в окне браузера
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

    //!  теперь приступаем непосредственно к Parallax

    var z_1 = 1 + (w / 10000) * p_b;
    $('.parallax__fog').css('transform', 'scale(' + z_1 + ')'); //? движение тумана
    $('.parallax__fog').css('opacity', o); //? прозрачность тумана

    //ниже движение гор
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

  //! start scrolling
  // var прокрутка = setInterval(function () {
  //   window.scrollBy(0, 30);
  // }, 40);

  // window.scroll({
  //   top: 1000,
  //   behavior: 'smooth',
  // });

  // window.scrollTo(0, document.body.scrollHeight);

  // let timerId = setTimeout(() => {
  //   window.scrollTo({
  //     top: document.querySelector('.content').offsetTop,
  //     behavior: 'smooth',
  //   });
  // }, 2000);

  showBoxTitleByTime('.parallax__box', 1000); // ? ??? здесь или оставить сверху

  //! finish scrolling

  // todo Start Это новый вариант, нужно с ним познакомиться, рассмотреть
  // ? https://gist.github.com/tyleryoungblood/10a8084bf5f166ed7fe33b0436bbd565
  /**
   * Will gracefuly scroll the page
   * This function will scroll the page using
   * an `ease-in-out` effect.
   *
   * You can use it to scroll to a given element, as well.
   * To do so, pass the element instead of a number as the position.
   * Optionally, you can pass a `queryString` for an element selector.
   *
   * The default duration is half a second (500ms)
   *
   * This function returns a Promise that resolves as soon
   * as it has finished scrolling. If a selector is passed and
   * the element is not present in the page, it will reject.
   *
   * EXAMPLES:
   *
   * ```js
   * window.scrollPageTo('#some-section', 2000);
   * window.scrollPageTo(document.getElementById('some-section'), 1000);
   * window.scrollPageTo(500); // will scroll to 500px in 500ms
   * ```
   *
   * @returns {Promise}
   * @param {HTMLElement|Number|Selector} Target
   * @param {Number} Duration [default=500]
   *
   * Inspired by @andjosh's work
   *
  //  */
  function scrollPageTo(to, duration = 500) {
    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    const easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    return new Promise((resolve, reject) => {
      const element = document.scrollingElement;

      if (typeof to === 'string') {
        to = document.querySelector(to) || reject();
      }
      if (typeof to !== 'number') {
        to = to.getBoundingClientRect().top + element.scrollTop;
      }

      let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

      const animateScroll = function () {
        currentTime += increment;
        let val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        } else {
          resolve();
        }
      };
      animateScroll();
    });
  }
  scrollPageTo(document.querySelector('.content'));

  // todo Finish Это новый вариант.........

  
});

