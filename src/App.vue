
<template>
  <div>
    <h1>CRUD на Vue с использованием Pinia</h1>
    <ProductList />
    <ProductForm />
  </div>
</template>

<script>
import ProductList from '../src/Companents/productList.vue';
import ProductForm from '../src/Companents/productForm.vue';

export default {
  components: {
    ProductList,
    ProductForm,
  },
};
</script>

<style>

h1{
  font-family: Arial, Helvetica, sans-serif;
}
</style>