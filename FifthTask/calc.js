let selectedProduct = '';
    let productPrice = 0;

    // Функция для выбора товара
    function selectProduct(event) {
      const selectedImg = event.target;

      if (selectedImg.classList.contains('product-image')) {
        // Убираем выделение с предыдущего товара
        const images = document.querySelectorAll('.product-image');
        images.forEach(img => img.classList.remove('selected'));

        // Добавляем выделение на выбранный товар
        selectedImg.classList.add('selected');

        // Сохраняем выбранный товар и его цену
        selectedProduct = selectedImg.id;
        productPrice = parseFloat(selectedImg.getAttribute('data-price'));
      }
    }

    // Функция для подсчета стоимости
    function calculatePrice() {
      if (!selectedProduct) {
        alert('Пожалуйста, выберите товар!');
        return;
      }

      // Получаем количество товара
      const quantity = document.getElementById('quantity').value;

      // Проверяем, является ли введенное значение числом, больше нуля
      if (quantity === '' || isNaN(quantity) || quantity <= 0) {
        alert('Пожалуйста, введите корректное количество (больше нуля).');
        return;
      }
// Рассчитываем стоимость
      const totalPrice = productPrice * quantity;

      // Выводим результат
      document.getElementById('result').textContent = `Стоимость заказа: ${totalPrice} руб`;
    }

    // Функция для сброса калькулятора
    function resetCalculator() {
      // Очищаем выбор товара
      selectedProduct = '';
      productPrice = 0;

      // Убираем выделение с изображений
      const images = document.querySelectorAll('.product-image');
      images.forEach(img => img.classList.remove('selected'));

      // Очищаем поле ввода количества
      document.getElementById('quantity').value = 1;

      // Очищаем результат
      document.getElementById('result').textContent = '';
    }

    // Добавляем обработчики событий
    document.querySelector('.product-images').addEventListener('click', selectProduct);
    document.getElementById('calculate-btn').addEventListener('click', calculatePrice);
    document.getElementById('reset-btn').addEventListener('click', resetCalculator);
