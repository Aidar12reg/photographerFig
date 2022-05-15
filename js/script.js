"use strict"
const swiper = new Swiper('.slider-main__body', {
   loop: true,

   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },

});


document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('form');
   console.log(form);
   form.addEventListener('submit', formSend);


   async function formSend(e) {
      event.preventDefault();
      let error = formValidate(form);

      // получаем данные формы
      let formData = new FormData(form);
      formData.append('image', formImage.files[0]);

      if (error === 0) {

      } else {
         alert('Заполните обязательные поля');
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');
      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);
         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else {
            if (input.value === '') {
               formAddError(input);
            }
         }
      }
      return error;
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   // функция проерки на правильность написания Email
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   };

   // работа с превью картинки в отправке
   const formImage = document.getElementById('formImage');
   const formPreview = document.getElementById('formPreview');
   // слушаем изменения в инпуте file
   formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
   });


   function uploadFile(file) {
      // проверяем тип файла
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
         alert('Разрешены только изображения.');
         formImage.value = '';
         return;
      }
      // проверяем размер файла (<2 мб)
      if (file.size > 2 * 1024 * 1024) {
         alert('Файл должен быть не более 2 МБ.')
         return;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
         formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
      };
      reader.onerror = function (e) {
         alert('Ошибка');
      };
      reader.readAsDataURL(file);
   }

});











let isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i); },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
   any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
