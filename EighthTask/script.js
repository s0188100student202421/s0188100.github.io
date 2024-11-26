// script.js

document.addEventListener("DOMContentLoaded", () => {
  const openFormBtn = document.getElementById('openFormBtn');
  const closeBtn = document.getElementById('closeBtn');
  const feedbackPopup = document.getElementById('feedbackPopup');
  const feedbackForm = document.getElementById('feedbackForm');
  const formMessage = document.getElementById('formMessage');
  
  // Открытие попапа
  openFormBtn.addEventListener('click', () => {
    feedbackPopup.style.display = 'flex';
    // Меняем URL с помощью History API
    history.pushState({ formOpen: true }, '', '#feedback-form');
  });

  // Закрытие попапа
  closeBtn.addEventListener('click', () => {
    feedbackPopup.style.display = 'none';
    history.pushState({ formOpen: false }, '', window.location.pathname);
  });

  // Обработчик истории при нажатии "Назад"
  window.addEventListener('popstate', () => {
    if (!history.state.formOpen) {
      feedbackPopup.style.display = 'none';
    }
  });

  // Восстановление данных формы из LocalStorage
  if (localStorage.getItem('formData')) {
    const formData = JSON.parse(localStorage.getItem('formData'));
    document.getElementById('fullName').value = formData.fullName || '';
    document.getElementById('email').value = formData.email || '';
    document.getElementById('phone').value = formData.phone || '';
    document.getElementById('organization').value = formData.organization || '';
    document.getElementById('message').value = formData.message || '';
    document.getElementById('agree').checked = formData.agree || false;
  }

  // Отправка формы
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      organization: document.getElementById('organization').value,
      message: document.getElementById('message').value,
      agree: document.getElementById('agree').checked
    };

    // Отправка данных на сервер с помощью fetch
    fetch('https://formcarry.com/s/your_form_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        formMessage.style.color = 'green';
        formMessage.textContent = 'Форма успешно отправлена!';
        feedbackForm.reset();
        localStorage.removeItem('formData'); // Очистить данные из LocalStorage
      } else {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Ошибка при отправке формы. Попробуйте еще раз.';
      }
    })
    .catch(error => {
      formMessage.style.color = 'red';
      formMessage.textContent = 'Ошибка при отправке формы. Попробуйте еще раз.';
    });

    // Сохранение данных формы в LocalStorage
    localStorage.setItem('formData', JSON.stringify(formData));
  });
});

