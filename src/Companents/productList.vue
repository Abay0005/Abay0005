
<template>
    <div>
      <h2>Список продуктов</h2>
      <button @click="fetchProducts">Обновить</button>
      <div v-if="loading" >Загрузка...</div>
      <div v-if="error">{{ error }}</div>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.product_name }} ({{ product.product_amount }})
          <button @click="deleteProduct(product.id)">Удалить</button>
          <button @click="selectProduct(product)">Редактировать</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useProductStore } from '../store/productStore';
  
  export default defineComponent({
    setup() {
      const store = useProductStore();
      const loading = ref(false);
      const error = ref(null);
      const products = ref([]);
  
      const fetchProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
          products.value = await store.fetchProducts(); 
        } catch (err) {
          error.value = 'Не удалось загрузить продукты';
          console.error(err);
        } finally {
          loading.value = false;
        }
      };
  
      const deleteProduct = async (id) => {
        try {
          await store.deleteProduct(id);
          await fetchProducts(); 
        } catch (err) {
          error.value = 'Не удалось удалить продукт';
          console.error(err);
        }
      };
  
      const selectProduct = (product) => {
        alert(`Выбран продукт: ${product.product_name}`);
        
      };
  
      return {
        fetchProducts,
        deleteProduct,
        selectProduct,
        products,
        loading,
        error,
      };
    },
  });
  </script>



<style scoped>
.product-list-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {

  font-family: 'Arial', sans-serif;
}

.loading,
.error,
.no-products {
  text-align: center;
  font-size: 18px;
  color: #555;
}

.product-list {
  list-style-type: none;
  padding: 0;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-weight: bold;
  font-size: 16px;
}

.product-amount {
  font-size: 14px;
  color: #888;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-btn {
  background-color: #4CAF50;
  color: white;
}

.update-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #e53935;
}

.no-products {
  font-size: 16px;
  color: #888;
}
</style>
  