import { reactive } from 'vue'

export const cartStore = reactive({
    items: JSON.parse(localStorage.getItem('cart') || '[]'),

    addItem(dish) {
        const existingItem = this.items.find(item => item.id === dish.id)

        if (existingItem) {
            existingItem.quantity += 1
        } else {
            this.items.push({ ...dish, quantity: 1 })
        }

        this.saveToStorage()
    },

    removeItem(dishId) {
        this.items = this.items.filter(item => item.id !== dishId)
        this.saveToStorage()
    },

    updateQuantity(dishId, quantity) {
        const item = this.items.find(item => item.id === dishId)
        if (item) {
            item.quantity = quantity
            if (quantity <= 0) {
                this.removeItem(dishId)
            } else {
                this.saveToStorage()
            }
        }
    },

    clearCart() {
        this.items = []
        this.saveToStorage()
    },

    get totalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    get itemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0)
    },

    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items))
    }
})