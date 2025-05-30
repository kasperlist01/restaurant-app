<template>
  <div class="cart">
    <div class="container">
      <h1 class="page-title">Корзина</h1>

      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте блюда из меню</p>
        <router-link to="/menu" class="menu-link">Перейти в меню</router-link>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <CartItem
              v-for="item in cartStore.items"
              :key="item.id"
              :item="item"
          />
        </div>

        <div class="cart-summary">
          <div class="summary-card">
            <h3>Итого</h3>
            <div class="summary-line">
              <span>Количество блюд:</span>
              <span>{{ cartStore.itemCount }}</span>
            </div>
            <div class="summary-line total">
              <span>Общая сумма:</span>
              <span>{{ cartStore.totalPrice }} ₽</span>
            </div>
            <router-link to="/checkout" class="checkout-btn">
              Оформить заказ
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem.vue'
import { cartStore } from '../store/cart.js'

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  setup() {
    return {
      cartStore
    }
  }
}
</script>

<style scoped>
.cart {
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

.empty-cart {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.empty-cart h2 {
  margin-bottom: 1rem;
  color: #333;
}

.empty-cart p {
  color: #666;
  margin-bottom: 2rem;
}

.menu-link {
  display: inline-block;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.3s;
}

.menu-link:hover {
  transform: translateY(-2px);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.summary-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
}

.summary-card h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}

.summary-line.total {
  border-top: 2px solid #eee;
  padding-top: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: #667eea;
}

.checkout-btn {
  display: block;
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: transform 0.3s;
}

.checkout-btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style>