
<template>
  <div class="form-card">
    <h2 class="form-title">Добавить продукт</h2>
    <form @submit.prevent="handleSubmit" class="product-form">
      <input
        v-model="product.product_name"
        class="input-field"
        placeholder="Название продукта"
        required
      />
      <input
        v-model.number="product.product_amount"
        class="input-field"
        placeholder="Количество"
        type="number"
        min="1"
        required
      />
      <button type="submit" class="submit-btn">Добавить</button>
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
      } catch {
        alert('Ошибка добавления продукта.');
      }
    };

    return { product, handleSubmit };
  },
});
</script>

<style scoped>
.form-card {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
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
  border-radius: 6px;
  width: 100%;
}

.input-field:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.submit-btn {
  padding: 12px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>
