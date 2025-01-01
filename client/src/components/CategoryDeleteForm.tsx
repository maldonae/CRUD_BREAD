import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type CategoryDeleteFormProps = {
  id: number;
  children: ReactNode;
};

function CategoryDeleteForm({ id, children }: CategoryDeleteFormProps) {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, {
          method: "delete",
        }).then((response) => {
          if (response.status === 204) {
            navigate("/categories");
          }
        });
      }}
    >
      <button type="submit">{children}</button>
    </form>
  );
}

export default CategoryDeleteForm;
