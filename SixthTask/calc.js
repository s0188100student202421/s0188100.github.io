window.addEventListener('DOMContentLoaded', function (event) {
  console.log("DOM fully loaded and parsed");
    let selectedProduct = '';
    let productPrice = 0;
    let serviceType = 1;
    let selectedOptionPrice = 0;
    let selectedPropertyPrice = 0;

    function selectProduct(productId, price) {
      const images = document.querySelectorAll('.product-image');
      images.forEach(img => img.classList.remove('selected'));
      const selectedImg = document.getElementById(productId);
      selectedImg.classList.add('selected');

      selectedProduct = productId;
      productPrice = price;
      updatePrice();
    }

    function updateOptionsAndProperties() {
      const optionsContainer = document.querySelector('.options-container');
      const propertyContainer = document.querySelector('.property-container');

      if (serviceType === 1) {
        optionsContainer.style.display = 'none';
        propertyContainer.style.display = 'none';
      } else if (serviceType === 2) {
        optionsContainer.style.display = 'block';
        propertyContainer.style.display = 'none';
      } else if (serviceType === 3) {
        optionsContainer.style.display = 'none';
        propertyContainer.style.display = 'block';
      }
    }

    function updatePrice() {
      const quantity = document.getElementById('quantity').value;
      let totalPrice = (productPrice + selectedOptionPrice + selectedPropertyPrice) * quantity;
      if (serviceType === 3 && quantity < 30) {
        alert('Для типа услуги 3 количество товара должно быть не менее 30 штук!');
        return;
      }

      if (serviceType === 3 && quantity >= 30) {
        const discountPrice = totalPrice * 0.8;  // 20% скидка
        document.getElementById('result').innerHTML = `
          Общая стоимость: ${totalPrice} руб.<br>
          Стоимость со скидкой (20%): ${discountPrice.toFixed(2)} руб.
        `;
      } else {
        document.getElementById('result').textContent = `Общая стоимость: ${totalPrice} руб.`;
      }
    }

    document.querySelectorAll('input[name="service-type"]').forEach(radio => {
      radio.addEventListener('change', function () {
        serviceType = parseInt(this.value);
        updateOptionsAndProperties();
        updatePrice();  // Пересчитываем цену при изменении типа услуги
      });
    });

    document.getElementById('product-options').addEventListener('change', function () {
      selectedOptionPrice = parseInt(this.value);
      updatePrice();  // Обновляем цену при выборе опции
    });

    document.getElementById('product-property').addEventListener('change', function () {
      selectedPropertyPrice = this.checked ? 15 : 0;
      updatePrice();  // Обновляем цену при изменении свойства
    });

    updateOptionsAndProperties();
});
