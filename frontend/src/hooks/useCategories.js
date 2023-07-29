import { useState, useEffect } from 'react';
import publicApi from '../api/publicApi';

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategory, setEditCategory] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await publicApi.get('api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // toastify
    }
  };

  useEffect(() => {
    // Load all categories
    fetchCategories();
  }, []);

  const createCategory = async () => {
    if (!newCategory) {
      alert('Please enter a category name.');
      return;
    }

    try {
      await publicApi.post('api/categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await publicApi.delete(`api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const loadCategory = async (id) => {
    try {
      const response = await publicApi.get(`api/categories/${id}`);
      setSelectedCategory(response.data);
    } catch (error) {
      console.error('Error loading category:', error);
    }
  };

  const updateCategory = async () => {
    if (!editCategory) {
      alert('Please enter a category name.');
      return;
    }

    try {
      await publicApi.put(`api/categories/${selectedCategory.id}`, {
        name: editCategory,
      });
      setSelectedCategory(null);
      setEditCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return {
    categories,
    newCategory,
    selectedCategory,
    editCategory,
    setNewCategory,
    setEditCategory,
    createCategory,
    deleteCategory,
    loadCategory,
    updateCategory,
  };
}

export default useCategories;
