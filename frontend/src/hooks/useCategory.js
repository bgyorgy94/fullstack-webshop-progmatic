import { useState, useEffect } from 'react';
import publicApi from '../api/publicApi';

function useCategory(id) {
  const [category, setCategory] = useState(null);

  const fetchCategory = async () => {
    try {
      const response = await publicApi.get(`/categories/${id}`);
      setCategory(response.data);
    } catch (error) {
      console.error('Error loading category:', error);
    }
  };

  useEffect(() => {
    // Load category
    fetchCategory(id);
  }, [id]);

  return category;
}

export default useCategory;
