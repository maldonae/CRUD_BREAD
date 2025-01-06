import { useNavigate } from "react-router-dom";
import ProgramForm from "../components/ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "",
  };

  return (
    <ProgramForm
      defaultValue={newProgram}
      onSubmit={(program) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(program),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(`/programs/${data.insertId}`);
          });
      }}
    >
      Ajouter
    </ProgramForm>
  );
}

export default ProgramNew;
