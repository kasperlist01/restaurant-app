<template>
  <div class="checkout">
    <div class="container">
      <h1 class="page-title">Оформление заказа</h1>

      <div class="checkout-content">
        <form @submit.prevent="submitOrder" class="checkout-form">
          <h2>Данные для доставки</h2>

          <div class="form-group">
            <label for="name">Имя *</label>
            <input
                id="name"
                v-model="form.name"
                type="text"
                :class="{ error: errors.name }"
                @blur="validateField('name')"
            >
            <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="phone">Телефон *</label>
            <input
                id="phone"
                v-model="form.phone"
                type="tel"
                :class="{ error: errors.phone }"
                @blur="validateField('phone')"
            >
            <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
          </div>

          <div class="form-group">
            <label for="address">Адрес доставки *</label>
            <textarea
                id="address"
                v-model="form.address"
                :class="{ error: errors.address }"
                @blur="validateField('address')"
            ></textarea>
            <span v-if="errors.address" class="error-text">{{ errors.address }}</span>
          </div>

          <div class="form-group">
            <label for="comment">Комментарий к заказу</label>
            <textarea
                id="comment"
                v-model="form.comment"
                placeholder="Дополнительные пожелания..."
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="!isFormValid">
            Подтвердить заказ
          </button>
        </form>

        <div class="order-summary">
          <h3>Ваш заказ</h3>
          <div class="order-items">
            <div v-for="item in cartStore.items" :key="item.id" class="order-item">
              <span>{{ item.name }} × {{ item.quantity }}</span>
              <span>{{ item.price * item.quantity }} ₽</span>
            </div>
          </div>
          <div class="order-total">
            <strong>Итого: {{ cartStore.totalPrice }} ₽</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { cartStore } from '../store/cart.js'

export default {
  name: 'Checkout',
  setup() {
    const router = useRouter()

    const form = reactive({
      name: '',
      phone: '',
      address: '',
      comment: ''
    })

    const errors = reactive({
      name: '',
      phone: '',
      address: ''
    })

    const validateField = (field) => {
      switch (field) {
        case 'name':
          errors.name = form.name.length < 2 ? 'Имя должно содержать минимум 2 символа' : ''
          break
        case 'phone':
          const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
          errors.phone = !phoneRegex.test(form.phone) ? 'Введите корректный номер телефона' : ''
          break
        case 'address':
          errors.address = form.address.length < 10 ? 'Введите полный адрес доставки' : ''
          break
      }
    }

    const isFormValid = computed(() => {
      return form.name.length >= 2 &&
          form.phone.length >= 10 &&
          form.address.length >= 10 &&
          !errors.name &&
          !errors.phone &&
          !errors.address
    })

    const submitOrder = () => {
      // Валидация всех полей
      validateField('name')
      validateField('phone')
      validateField('address')

      if (isFormValid.value) {
        // Сохраняем данные заказа
        const orderData = {
          items: [...cartStore.items],
          total: cartStore.totalPrice,
          customer: { ...form },
          orderNumber: Math.floor(Math.random() * 1000000),
          date: new Date().toLocaleString()
        }

        localStorage.setItem('lastOrder', JSON.stringify(orderData))
        cartStore.clearCart()
        router.push('/order-success')
      }
    }

    return {
      form,
      errors,
      cartStore,
      validateField,
      isFormValid,
      submitOrder
    }
  }
}
</script>

<style scoped>
.checkout {
  padding: 2rem 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.checkout-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.checkout-form h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ff4757;
}

.error-text {
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.order-summary {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
  height: fit-content;
}

.order-summary h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.order-total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
  font-size: 1.2rem;
  color: #667eea;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
}
</style>