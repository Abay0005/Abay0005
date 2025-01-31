
<template>
  <div class="product-list-container">
    <h2>Список продуктов</h2>
    <button class="refresh-btn" @click="fetchProducts">Обновить</button>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="products.length === 0 && !loading && !error" class="no-products">
      Нет продуктов. Добавьте новый продукт.
    </div>
    <div class="card-container">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3 class="product-title">{{ product.product_name }}</h3>
        <p class="product-amount">Количество: {{ product.product_amount }}</p>
        <div class="actions">
          <button class="delete-btn" @click="deleteProduct(product.id)">Удалить</button>
          <button class="edit-btn" @click="selectProduct(product)">Редактировать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      products: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchProducts() {
      try {
        this.loading = true;
        this.error = null;

        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Ошибка при загрузке продуктов');
        this.products = await response.json();
      } catch (err) {
        this.error = err.message || 'Не удалось загрузить данные';
      } finally {
        this.loading = false;
      }
    },
    deleteProduct(productId) {
      this.products = this.products.filter((product) => product.id !== productId);
    },
    selectProduct(product) {
      console.log('Редактируем:', product);
    },
  },
  created() {
    this.fetchProducts();
  },
});
</script>

<style scoped>
.product-list-container {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
}

.refresh-btn {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.refresh-btn:hover {
  background-color: #45a049;
}

.loading,
.error,
.no-products {
  text-align: center;
  font-size: 18px;
  color: #555;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-amount {
  color: #555;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: space-around;
}

.delete-btn,
.edit-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #e53935;
}

.edit-btn {
  background-color: #2196f3;
  color: white;
}

.edit-btn:hover {
  background-color: #1976d2;
}
</style>
