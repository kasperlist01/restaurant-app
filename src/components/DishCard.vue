<template>
  <div class="dish-card" @click="addToCart">
    <div class="dish-image">
      <img :src="dish.image" :alt="dish.name" />
      <!-- Анимированная иконка корзины -->
      <div
          v-if="isAdding"
          class="cart-animation"
          :class="{ 'animate': isAdding }"
      >
        🛒
      </div>
    </div>
    <div class="dish-info">
      <h3 class="dish-name">{{ dish.name }}</h3>
      <p class="dish-description">{{ dish.description }}</p>
      <div class="dish-footer">
        <span class="dish-price">{{ dish.price }} ₽</span>
        <button
            class="add-btn"
            @click.stop="addToCart"
            :class="{ 'adding': isAdding }"
            :disabled="isAdding"
        >
          <span v-if="!isAdding" class="btn-text">
            <span class="btn-icon">+</span>
            Добавить
          </span>
          <span v-else class="btn-success">
            <span class="checkmark">✓</span>
            Добавлено!
          </span>
        </button>
      </div>
    </div>

    <!-- Анимация частиц -->
    <div v-if="isAdding" class="particles">
      <div
          v-for="i in 6"
          :key="i"
          class="particle"
          :style="{ '--delay': i * 0.1 + 's' }"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { cartStore } from '../store/cart.js'

export default {
  name: 'DishCard',
  props: {
    dish: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isAdding = ref(false)

    const addToCart = () => {
      if (isAdding.value) return

      cartStore.addItem(props.dish)
      isAdding.value = true

      // Создаем эффект вибрации
      if (navigator.vibrate) {
        navigator.vibrate(100)
      }

      setTimeout(() => {
        isAdding.value = false
      }, 2000)
    }

    return {
      addToCart,
      isAdding
    }
  }
}
</script>

<style scoped>
.dish-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.dish-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.dish-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.dish-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.dish-card:hover .dish-image img {
  transform: scale(1.1);
}

/* Анимация иконки корзины */
.cart-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  opacity: 0;
  pointer-events: none;
}

.cart-animation.animate {
  animation: cartFly 1.5s ease-out forwards;
}

@keyframes cartFly {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.5);
  }
  30% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
  60% {
    opacity: 1;
    transform: translate(-50%, -200%) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -300%) scale(0.3);
  }
}

.dish-info {
  padding: 1.5rem;
}

.dish-name {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.dish-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dish-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #667eea;
}

.add-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 120px;
  height: 45px;
  position: relative;
  overflow: hidden;
}

.add-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.add-btn:disabled {
  cursor: not-allowed;
}

.add-btn.adding {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  animation: buttonPulse 0.6s ease;
}

@keyframes buttonPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.btn-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.btn-success {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.checkmark {
  font-size: 1.2rem;
  animation: checkmarkPop 0.6s ease;
}

@keyframes checkmarkPop {
  0% { transform: scale(0); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* Анимация частиц */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  animation: particleFloat 2s ease-out forwards;
  animation-delay: var(--delay);
}

.particle:nth-child(1) { top: 20%; left: 20%; }
.particle:nth-child(2) { top: 30%; left: 80%; }
.particle:nth-child(3) { top: 60%; left: 10%; }
.particle:nth-child(4) { top: 70%; left: 90%; }
.particle:nth-child(5) { top: 40%; left: 50%; }
.particle:nth-child(6) { top: 80%; left: 60%; }

@keyframes particleFloat {
  0% {
    opacity: 1;
    transform: translateY(0) scale(0);
  }
  20% {
    opacity: 1;
    transform: translateY(-20px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(0);
  }
}

/* Дополнительные эффекты при наведении */
.dish-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
  );
  transition: left 0.5s;
  z-index: 1;
}

.dish-card:hover::before {
  left: 100%;
}

/* Анимация появления карточки */
.dish-card {
  animation: cardAppear 0.6s ease-out;
}

@keyframes cardAppear {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 768px) {
  .add-btn {
    min-width: 100px;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .cart-animation {
    font-size: 1.5rem;
  }

  .particle {
    width: 6px;
    height: 6px;
  }
}
</style>