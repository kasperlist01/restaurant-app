<template>
  <div class="menu">
    <div class="container">
      <h1 class="page-title">Наше меню</h1>

      <div class="filters">
        <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="['filter-btn', { active: selectedCategory === category }]"
        >
          {{ category }}
        </button>
      </div>

      <div class="dishes-grid">
        <DishCard
            v-for="dish in filteredDishes"
            :key="dish.id"
            :dish="dish"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import DishCard from '../components/DishCard.vue'
import { dishes, categories } from '../data/dishes.js'

export default {
  name: 'Menu',
  components: {
    DishCard
  },
  setup() {
    const selectedCategory = ref('Все')

    const filteredDishes = computed(() => {
      if (selectedCategory.value === 'Все') {
        return dishes
      }
      return dishes.filter(dish => dish.category === selectedCategory.value)
    })

    return {
      dishes,
      categories,
      selectedCategory,
      filteredDishes
    }
  }
}
</script>

<style scoped>
.menu {
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

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

.filter-btn:hover,
.filter-btn.active {
  background: white;
  color: #667eea;
  transform: translateY(-2px);
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
</style>