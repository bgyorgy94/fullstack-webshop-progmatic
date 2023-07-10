import React, { useState, useEffect } from 'react';
import publicApi from '../api/publicApi';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategory, setEditCategory] = useState('');

  useEffect(() => {
    // Load all categories
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await publicApi.get('/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const createCategory = async () => {
    if (!newCategory) {
      alert('Please enter a category name.');
      return;
    }

    try {
      await publicApi.post('/api/categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await publicApi.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const loadCategory = async (id) => {
    try {
      const response = await publicApi.get(`/api/categories/${id}`);
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
      await publicApi.put(`/api/categories/${selectedCategory.id}`, {
        name: editCategory,
      });
      setSelectedCategory(null);
      setEditCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div>
      <h2>New Category</h2>
      <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
      <button onClick={createCategory}>Create</button>

      <h2>All Categories</h2>
      {categories.map((category) => (
        <div key={category.id}>
          <p>{category.name}</p>
          <button onClick={() => deleteCategory(category.id)}>Delete</button>
          <button onClick={() => loadCategory(category.id)}>Edit</button>
        </div>
      ))}

      {selectedCategory && (
        <div>
          <h2>Edit Category</h2>
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          />
          <button onClick={updateCategory}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Categories;
