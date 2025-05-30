<template>
  <div class="cart-item">
    <img :src="item.image" :alt="item.name" class="item-image">
    <div class="item-info">
      <h4 class="item-name">{{ item.name }}</h4>
      <p class="item-price">{{ item.price }} ₽</p>
    </div>
    <div class="quantity-controls">
      <button @click="decreaseQuantity" class="qty-btn">-</button>
      <span class="quantity">{{ item.quantity }}</span>
      <button @click="increaseQuantity" class="qty-btn">+</button>
    </div>
    <div class="item-total">
      {{ item.price * item.quantity }} ₽
    </div>
    <button @click="removeItem" class="remove-btn">×</button>
  </div>
</template>

<script>
import { cartStore } from '../store/cart.js'

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const increaseQuantity = () => {
      cartStore.updateQuantity(props.item.id, props.item.quantity + 1)
    }

    const decreaseQuantity = () => {
      cartStore.updateQuantity(props.item.id, props.item.quantity - 1)
    }

    const removeItem = () => {
      cartStore.removeItem(props.item.id)
    }

    return {
      increaseQuantity,
      decreaseQuantity,
      removeItem
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.item-price {
  color: #666;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #667eea;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-weight: bold;
  color: #667eea;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
}
</style>