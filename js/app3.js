window.addEventListener('load', () => {
  // ? Чтобы при перезагрузке страницы она начиналась с самого верха
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
    // window.location.reload(true);
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



  function name() {
    let intervalId1 = setInterval(function () {
      window.scrollBy(0, 10);
      if (scrollY >= 20) {
        clearInterval(intervalId1);
        clearTimeout(h);
      }
    }, 40);
  }

  function name1() {
    let intervalId2 = setInterval(function () {
      window.scrollBy(0, 10);
      // if (scrollY >= 80) {
        if (scrollY >= document.body.scrollHeight / 8) {
          clearInterval(intervalId2);
          clearTimeout(hh);
        }
    }, 50);
  }

  function name2() {
    let intervalId3 = setInterval(function () {
      window.scrollBy(0, 5);
      // window.scrollTo({
      //   top: document.querySelector('.content').offsetTop,
      //   behavior: 'smooth',
      // });
      if (scrollY >= document.querySelector('.content').offsetTop - 5) {
        clearInterval(intervalId3);
          clearTimeout(hhh);

      } 
    }, 15);
  }

  showBoxTitleByTime('.parallax__box', 1000);

  let h = setTimeout(name, 3800);
  let hh = setTimeout(name1, 4800);
  let hhh = setTimeout(name2, 5000);

  console.log(window.scrollY); //* на сколько пикселей страница пролистана вниз
  

  //* * Template start* * * * * * * * *
  // var прокрутка = setInterval(function () {
  //   window.scrollBy(0, 30);
  // }, 40);

  // function myScroll() {
  //   window.scrollBy({
  //     top: 60,
  //     behavior: 'smooth',
  //   }); //*1
  // }

  // function myScroll1() {
  //   window.scrollBy({
  //     top: 360,
  //     behavior: 'smooth',
  //   }); //*2
  // }
  // function myScroll2() {
  //   window.scrollTo({
  //     top: document.querySelector('.content').offsetTop,
  //     behavior: 'smooth',
  //   }); //*3
  // }
  // setTimeout(myScroll, 4000); //*1
  // setTimeout(myScroll1, 4500); //*2
  // setTimeout(myScroll2, 4500); //*3

  // setTimeout(function() {
  //   let h = setInterval(() => {
  //     if(scrollY <= 760)
  //     window.scrollBy(0, 10)
  //   },10)
  // },5000)

  // setTimeout(myScroll2, 5000); //*3

  // let timerId = setTimeout(() => {
  //   window.scrollTo({
  //     top: document.querySelector('.content').offsetTop,
  //     behavior: 'smooth',
  //   });
  // }, 6000); //*2

  // function fr() {
  //   let d = setInterval(() => {
  //     window.scrollBy(0, 30);
  //     if (scrollY === 750) {
  //       clearInterval(d);
  //     }
  //   }, 30);
  // }
  // setTimeout(fr, 9000); //*3

  // window.scrollTo(0, document.body.scrollHeight);

  // function start() {
  //   window.scrollBy(0, 30);
  //   if (scrollY >= 760) {
  //     clearInterval(d);
  //   }
  // }
  // let d = setInterval(start, 30);

  // function start() {
  //   window.scrollBy(0, 30);
  //   if (scrollY >= 760) {
  //     clearInterval(d);
  //   }
  // }

  //! finish scrolling

  ///? 1 variant
  // function printNumbers(from, to){
  //   setTimeout(function tick() {
  //     console.log(from)
  //     from++
  //     if(from <= to) {
  //       setTimeout(tick, 1000)
  //     }
  //   }, 1000)
  // }
  // printNumbers(5, 8);

  ///? 2 variant
  // function printNumbers(from, to) {
  //   setTimeout(function tick() {
  //     console.log(from);
  //     from++;
  //     if (from > to) {
  //       return;
  //     }
  //     let c = setTimeout(tick, 1000);
  //   }, 1000);
  // }
  // printNumbers(5, 8);

  // function showNum(num) {
  //   console.log(num);
  //   let d = setTimeout(showNum, 1000, ++num);
  //   if(num === 4) {
  //     clearTimeout(d)
  //   }
  // }

  // setTimeout(showNum, 1000, 1)

  // ? Start Это новый вариант, нужно с ним познакомиться, рассмотреть
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
  // function scrollPageTo(to, duration = 500) {
  //   //t = current time
  //   //b = start value
  //   //c = change in value
  //   //d = duration
  //   const easeInOutQuad = function (t, b, c, d) {
  //     t /= d / 2;
  //     if (t < 1) return (c / 2) * t * t + b;
  //     t--;
  //     return (-c / 2) * (t * (t - 2) - 1) + b;
  //   };

  //   return new Promise((resolve, reject) => {
  //     const element = document.scrollingElement;

  //     if (typeof to === 'string') {
  //       to = document.querySelector(to) || reject();
  //     }
  //     if (typeof to !== 'number') {
  //       to = to.getBoundingClientRect().top + element.scrollTop;
  //     }

  //     let start = element.scrollTop,
  //       change = to - start,
  //       currentTime = 0,
  //       increment = 20;

  //     const animateScroll = function () {
  //       currentTime += increment;
  //       let val = easeInOutQuad(currentTime, start, change, duration);
  //       element.scrollTop = val;
  //       if (currentTime < duration) {
  //         setTimeout(animateScroll, increment);
  //       } else {
  //         resolve();
  //       }
  //     };
  //     animateScroll();
  //   });
  // }
  // scrollPageTo(document.querySelector('.content'));

  // ? Finish Это новый вариант,........

  // function scrollPageTo() {
  //   return new Promise((resolve, reject) => {
  //     if (window.scrollY === 0) {
  //       window.scrollBy({
  //         left: 0,
  //         top: 350,
  //         behavior: 'smooth',
  //       });
  //     } else if (window.scrollY === 350) {
  //       window.scrollBy({
  //       left: 0,
  //       top: 650,
  //       behavior: 'smooth',
  //     });
  //     }

  //   });
  // }
  // scrollPageTo();
  // scrollPageTo(document.querySelector('.parallax__subtitle-icon'), 4000);

  // * training starts here

  // function getNum(num) {
  //   console.log(num);
  //   if(num <= 5) {
  //     setTimeout(getNum, 1000, ++num);
  //   }
  // }

  // setTimeout(getNum, 1000, 0)

  // function count(i) {
  //   if(i === 0) {
  //     return;
  //   }
  //   count(i-1)
  //   console.log(i);
  // }
  // count(5)

  //* training finished
});
