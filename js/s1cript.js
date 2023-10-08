document.addEventListener('DOMContentLoaded', () => {
  function showBoxTitleByTime(selector, time) {
    setTimeout(() => {
      document.querySelector(selector).classList.add('show');
    }, time);
  }
  showBoxTitleByTime('.parallax__box', 1000);

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

    // if (s > 0) {
    //   document.querySelector('svg').classList.remove('show');
    // } else {
    //   document.querySelector('svg').classList.add('show');
    // }


    //? теперь приступаем непосредственно к Parallax
    //
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
});

//************************ */

// Функция для плавного скроллинга до указанного элемента
function scrollTo(element, delay) {
  setTimeout(function() {
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    });
  }, delay);
}

// Функция для остановки скроллинга на указанное количество секунд
function pauseScrolling(duration) {
  return new Promise(function(resolve) {
    setTimeout(resolve, duration * 1000);
  });
}

// Функция, которая выполняет автоматический скроллинг страницы
async function autoScroll() {
  while (true) {
    // Прокрутка до header, остановка на 3 секунды
    scrollTo(document.querySelector('.content'), 2000);
    await pauseScrolling(3); // ! .then здесь нужен?

    // Проверка, был ли скролл страницы вручную вернут наверх
    if (window.scrollY === 0) {
      continue; // Повтор процесса скроллинга сначала
    }

    // Прокрутка до середины страницы, остановка на 5 секунд
    scrollTo(document.documentElement.scrollHeight / 2, 0);
    await pauseScrolling(5);

    // Прокрутка до конца страницы
    scrollTo(document.documentElement.scrollHeight, 0);
  }
}

// Функция, которая будет вызвана после загрузки страницы
window.addEventListener('load', function() {
  // Установка скролла страницы вверх
  window.scrollTo(0, 0);

  // Запуск автоматического скроллинга через 2 секунды после загрузки страницы
  setTimeout(autoScroll, 2000);
});

//*********************** */


function scrollToSection() {
  // Сначала прокручиваем до элемента content
  window.scrollTo({
    top: document.querySelector('.content').offsetTop,
    behavior: 'smooth',
  });

  // После прокрутки до header, останавливаемся на 3 секунды
  setTimeout(function () {
    // Затем прокручиваем до середины страницы
    window.scrollTo({
      top: document.body.scrollHeight / 2,
      behavior: 'smooth',
    });

    // После прокрутки до середины, останавливаемся на 5 секунд
    setTimeout(function () {
      // Затем прокручиваем до конца страницы
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });

      // Проверяем, является ли текущая позиция скролла страницы верхней
      if (window.scrollY === 0) {
        // Если текущая позиция верхняя, то повторяем весь процесс скроллинга
        scrollToSection();
      }
    }, 5000);
  }, 3000);
}

// Запускаем автоматический скроллинг через 2 секунды после загрузки страницы
setTimeout(scrollToSection, 2000);

// При перезагрузке страницы, прокручиваем страницу в самый верх
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
