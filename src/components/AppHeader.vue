<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo">
        🍕 Ресторан "Вкусняшка"
      </router-link>

      <nav class="nav">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/menu" class="nav-link">Меню</router-link>
        <router-link to="/cart" class="nav-link cart-link">
          🛒 Корзина
          <span v-if="cartStore.itemCount > 0" class="cart-count">
            {{ cartStore.itemCount }}
          </span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { cartStore } from '../store/cart.js'

export default {
  name: 'AppHeader',
  setup() {
    return {
      cartStore
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #667eea;
}

.cart-link {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}
</style>