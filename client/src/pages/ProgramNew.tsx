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
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            navigate(`/programs/${data.insertId}`);
          })
          .catch((error) => {
            console.error("Error during submission:", error);
            alert("Failed to add the program. Please try again.");
          });
      }}
    >
      Ajouter
    </ProgramForm>
  );
}

export default ProgramNew;
