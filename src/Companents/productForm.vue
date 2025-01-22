
<template>
    <div>
      <h2>Добавить продукт</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="product.product_name" placeholder="Название продукта" required />
        <input v-model.number="product.product_amount" placeholder="Количество" type="number" required />
        <button type="submit">Добавить</button>
      </form>
    </div>
  </template>
  
  <script>
  import { defineComponent, reactive } from 'vue';
  import { useProductStore } from '../store/productStore';
  
  export default defineComponent({
    setup() {
      const store = useProductStore(); 
      const product = reactive({
        product_name: '',
        product_amount: 1,
      });
  
      const handleSubmit = async () => {
        try {
          await store.addProduct({ ...product }); 
          product.product_name = ''; 
          product.product_amount = 1;
        } catch (error) {
          console.error('Ошибка добавления продукта:', error);
        }
      };
  
      return { product, handleSubmit };
    },
  });
  </script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
 
  font-family: 'Arial', sans-serif;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.input-field:focus {
  outline: none;
  border-color: #4CAF50;
}

.submit-btn {
  padding: 12px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>
  
  