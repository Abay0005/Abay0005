
import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = 'http://dev.mindwave.kz/api/sandbox/crud'; 

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get(API_BASE_URL); 
        this.products = response.data;
      } catch (error) {
        this.error = 'Ошибка загрузки данных';
      } finally {
        this.loading = false;
      }
    },

    async addProduct(product) {
      this.loading = true;
      try {
        const response = await axios.post(API_BASE_URL, product); 
        this.products.push(response.data);
      } catch (error) {
        this.error = 'Ошибка добавления продукта';
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id, product) {
      this.loading = true;
      try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, product); 
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }
      } catch (error) {
        this.error = 'Ошибка обновления продукта';
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id) {
      this.loading = true;
      try {
        await axios.delete(`${API_BASE_URL}/${id}`); 
        this.products = this.products.filter((p) => p.id !== id);
      } catch (error) {
        this.error = 'Ошибка удаления продукта';
      } finally {
        this.loading = false;
      }
    },
  },
});
