<template>
  <div class="order-success">
    <div class="container">
      <div class="success-card">
        <div class="success-icon">✅</div>
        <h1>Заказ успешно оформлен!</h1>
        <p class="order-number">Номер заказа: #{{ orderData.orderNumber }}</p>
        <p class="delivery-info">
          Ваш заказ будет доставлен в течение 30-45 минут по адресу:<br>
          <strong>{{ orderData.customer.address }}</strong>
        </p>

        <div class="order-details">
          <h3>Детали заказа:</h3>
          <div class="order-items">
            <div v-for="item in orderData.items" :key="item.id" class="order-item">
              <span>{{ item.name }} × {{ item.quantity }}</span>
              <span>{{ item.price * item.quantity }} ₽</span>
            </div>
          </div>
          <div class="order-total">
            <strong>Итого: {{ orderData.total }} ₽</strong>
          </div>
        </div>

        <div class="actions">
          <router-link to="/menu" class="btn secondary">Продолжить покупки</router-link>
          <router-link to="/" class="btn primary">На главную</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'OrderSuccess',
  setup() {
    const router = useRouter()

    // Создаём структуру по умолчанию, чтобы избежать ошибок при рендере
    const orderData = ref({
      orderNumber: '',
      customer: {
        address: '',
        name: '',
        phone: '',
        comment: ''
      },
      items: [],
      total: 0,
      date: ''
    })

    onMounted(() => {
      const savedOrder = localStorage.getItem('lastOrder')
      if (savedOrder) {
        orderData.value = JSON.parse(savedOrder)
      } else {
        // Если нет данных заказа, перенаправляем на главную
        router.push('/')
      }
    })

    return {
      orderData
    }
  }
}
</script>

<style scoped>
.order-success {
  padding: 2rem 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
}

.success-card {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-card h1 {
  color: #4CAF50;
  margin-bottom: 1rem;
}

.order-number {
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 1.5rem;
}

.delivery-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.order-details {
  text-align: left;
  margin-bottom: 2rem;
}

.order-details h3 {
  margin-bottom: 1rem;
  color: #333;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.order-total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
  font-size: 1.2rem;
  color: #667eea;
  text-align: right;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn.secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}
</style>