import { useParams } from 'react-router-dom';
import useCategory from '../hooks/useCategory';

function Category() {
  const { id } = useParams();
  const category = useCategory(id);

  if (!category) {
    return <div>Loading category...</div>;
  }

  return (
    <div>
      <h2>Category</h2>
      <div key={category.id}>
        <p>{category.id}</p>
        <p>{category.name}</p>
      </div>
    </div>
  );
}

export default Category;
