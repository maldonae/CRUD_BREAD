import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CategoryDeleteForm from "../components/CategoryDeleteForm";

type Category = {
  id: number;
  name: string;
};

function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null as null | Category);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category) => {
        setCategory(data);
      });
  }, [id]);

  return (
    category && (
      <>
        <h1>{category.name}</h1>
        <Link to={`/categories/${category.id}/edit`}>Modifier</Link>
        <CategoryDeleteForm id={category.id}>Supprimer</CategoryDeleteForm>
      </>
    )
  );
}

export default CategoryDetail;
