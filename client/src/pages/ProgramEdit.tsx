import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProgramForm from "../components/ProgramForm";

type Program = {
  id: number;
  title: string;
  synopsis?: string;
};

function ProgramEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [programs, setPrograms] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setPrograms(data);
      });
  }, [id]);

  return (
    programs && (
      <ProgramForm
        defaultValue={programs}
        onSubmit={(programData) => {
          fetch(
            `${import.meta.env.VITE_API_URL}/api/programs/${programs?.id}`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(programData),
            },
          ).then((response) => {
            if (response.status === 204) {
              navigate(`/programs/${programs?.id}`);
            }
          });
        }}
      >
        Modifier
      </ProgramForm>
    )
  );
}

export default ProgramEdit;
