import type { ReactNode } from "react";

type ProgramData = {
  title: string;
};

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: ProgramData;
  onSubmit: (program: ProgramData) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get("title") as string;

        onSubmit({
          title,
        });
      }}
    >
      <input type="text" name="title" defaultValue={defaultValue.title} />
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramForm;
