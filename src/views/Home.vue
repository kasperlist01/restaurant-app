<template>
  <div class="home">
    <div class="hero">
      <div class="container">
        <h1 class="hero-title">Добро пожаловать в ресторан "Вкусняшка"</h1>
        <p class="hero-subtitle">
          Лучшие блюда итальянской кухни с доставкой на дом
        </p>
        <router-link to="/menu" class="cta-button">
          Перейти в меню
        </router-link>
      </div>
    </div>

    <div class="features">
      <div class="container">
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">🍕</div>
            <h3>Свежие продукты</h3>
            <p>Используем только самые свежие и качественные ингредиенты</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🚚</div>
            <h3>Быстрая доставка</h3>
            <p>Доставляем заказы в течение 30-45 минут</p>
          </div>
          <div class="feature">
            <div class="feature-icon">👨‍🍳</div>
            <h3>Опытные повара</h3>
            <p>Наши шеф-повара имеют многолетний опыт работы</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.features {
  background: white;
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature p {
  color: #666;
  line-height: 1.6;
}
</style>