import useCategories from '../hooks/useCategories';

export default function Categories() {
  const {
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
  } = useCategories();

  return (
    <div>
      <h2>New Category</h2>
      <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
      <button type="button" onClick={createCategory}>
        Create
      </button>

      <h2>All Categories</h2>
      {categories.map((category) => (
        <div key={category.id}>
          <p>category id: {category.id}</p>
          <p>category name: {category.name}</p>
          <button type="button" onClick={() => deleteCategory(category.id)}>
            Delete
          </button>
          <button type="button" onClick={() => loadCategory(category.id)}>
            Edit
          </button>
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
          <button type="button" onClick={updateCategory}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}
