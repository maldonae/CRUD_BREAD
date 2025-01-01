import type { ReactNode } from "react";

type CategoryData = {
  name: string;
};

interface CategoryFormProps {
  children: ReactNode;
  defaultValue: CategoryData;
  onSubmit: (category: CategoryData) => void;
}

function CategoryForm({ children, defaultValue, onSubmit }: CategoryFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;

        onSubmit({
          name,
        });
      }}
    >
      <input type="text" name="name" defaultValue={defaultValue.name} />
      <button type="submit">{children}</button>
    </form>
  );
}

export default CategoryForm;
