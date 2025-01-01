import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CategoryForm from "../components/CategoryForm";

type Category = {
  id: number;
  name: string;
};

function CategoryEdit() {
  const navigate = useNavigate();

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
      <CategoryForm
        defaultValue={category}
        onSubmit={(categoryData) => {
          fetch(
            `${import.meta.env.VITE_API_URL}/api/categories/${category.id}`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(categoryData),
            },
          ).then((response) => {
            if (response.status === 204) {
              navigate(`/categories/${category.id}`);
            }
          });
        }}
      >
        Modifier
      </CategoryForm>
    )
  );
}

export default CategoryEdit;
