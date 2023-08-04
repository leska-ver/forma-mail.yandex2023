document.addEventListener('DOMContentLoaded', function() {
  // console.log(); находит в js-ce ошибку. Deftools



  // Модальное окно для нескольких окон. Модалка не прокручиваеться.//
  const activeClass = "modal-active";
  const buttons = document.querySelectorAll(".modalBtn-js");

  for (let button of buttons) {
    modalEvent(button);
  }
  
  function closeModal (modal) {
	 modal.classList.remove(activeClass);
	 document.body.style.overflow  = '';
  }
	  
  function modalEvent(button) {
    button.addEventListener("click", (e) => {//(e) - дефолт - чтобы при нажитие на модального окна, модалка не улетала вверх.
      e.preventDefault();

      const trigger = button.getAttribute("data-modal-trigger");
      const modal = document.querySelector(`[data-modal=${trigger}]`);
      const modalContent = modal.querySelector(".modal-container");
      const close = modal.querySelector(".modal-close");
           
      /* --Cтили body при открытие модального окна-- */
      modal.classList.add('modal-active');		 
      if (modal.classList.contains(activeClass)) {
        document.body.style.overflow  = 'hidden';
      }

      close.addEventListener("click", () =>  {
		 closeModal (modal); 
	  });
      modal.addEventListener("click", () => {
		 closeModal (modal); 
	  });
      modalContent.addEventListener("click", (e) => e.stopPropagation());
      
    });
  }; 

   


   // Слоник модал - d-31
   const btnCloseBuy = document.querySelector('.main-form__modal-close_js');
   const modalBuy = document.querySelector('.main-form__slonik_js');
   if (modalBuy) {
     btnCloseBuy.addEventListener('click', function () {
       document.querySelector('.main-form__slonik_js').classList.toggle('main-form__slonik_js_active');
     });
     modalBuy.addEventListener('click', function (event) {
       if (event._notClick) return;
       modalBuy.classList.remove('main-form__slonik_js_active');
       document.querySelector('.main-form__slonik-sps_js').classList.remove('main-form__slonik-sps_js_active');
     });
   }
   
 
   // Активность кнопки - галка и Отправить(.recording__button_filled:disabled)
   const formDis = document.querySelector(".form-disabled");
   if (formDis) {
     const e = formDis.querySelector(".checkbox-disabled");
     if (e) {
       const t = formDis.querySelector(".recording__button");
       e.addEventListener("change", () => {
         e.checked ? t.removeAttribute("disabled") : t.setAttribute("disabled", "")
       })
     }
   }
 
 
   // inputmask - Телефон main-form
   const form = document.querySelector('.main-form__form_js');
   if (form) {// Обёртка if. Спасение Gulp-а от null в браузере 
     const telSelector = form.querySelector('input[type="tel"]');
     const inputMask = new Inputmask('+7 (999) 999-99-99');
     inputMask.mask(telSelector);
 
     new window.JustValidate('.main-form__form_js', {
       rules: {
         name: {
         required: true,
         minLength: 2,
         maxLenght: 10,
         strength: {
           custom: '^[А-яёЁ\s-]'//только по русски текст
           //custom: '^[а-яёЁ\s]+$'только по русски и маленькими буквами
           //custom: '^[a-yeO\s]+$'только по английски текст
         }
         },  
         tel: {
           required: true,
           function: () => {
             const phone = telSelector.inputmask.unmaskedvalue();
             return Number(phone) && phone.length === 10;
           }
         },
         checkbox: { // Обязательная галка
         required: true
         }
       },
       colorWrong: '#ff6972',
       messages: {
         name: {
           required: 'Введите ваше имя',
           minLength: 'Введите 3 и более символов',
           maxLength: 'Запрещено вводить более 15 символов',
           strength: 'Текст только по русски'
           //strength: 'Текст только по русски и маленькими буквами'
           //strength: 'Текст только по английски'
         },
         email: {
           email: 'Недопустимый формат',
           required: 'Введите email'
         },
         tel: {
           required: 'Введите ваш телефон',
           function: 'Здесь должно быть 10 символов без +7'
         },
         checkbox: {
           required: 'Поставьте галочку',
           function: 'Здесь должна быть галка'
         }
       },
 
       //*отправка формы*/
       submitHandler: function (thisForm) {
         let formData = new FormData(thisForm);
 
         let xhr = new XMLHttpRequest();
 
         xhr.onreadystatechange = function () {
           if (xhr.readyState === 4) {
             if (xhr.status === 200) {
               console.log('Отправлено');
             } //if xhr
           }
         }
 
 
         xhr.open('POST', 'mail.php', true);
         xhr.send(formData);
         thisForm.reset();
         document.querySelector('.main-form__slonik_js').classList.toggle('main-form__slonik_js_active');
         document.querySelector('.main-form__slonik-sps_js').classList.toggle('main-form__slonik-sps_js_active');
       }
     })
   }




  //Плавный скролл по якорям. В любое место можно кинуть. Всегда ниже всех. Библиотеку jquery(пол..) в html. Работает с помощбю id(#)//
  $(function(){
    $('a[href^="#"]').click(function(){
      var target = $(this).attr('href');
      $('html, body').animate({scrollTop: $
    (target).offset().top},800);
      return false;
    })
  });
  







  










});