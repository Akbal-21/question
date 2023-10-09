import { ssApi } from "@/api";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  id: number;
}

const Questions: FC<Props> = ({ id }) => {
  const [quest, setQuest] = useState("");
  const [questInformation, setQuestInformatio] = useState("");
  const [nameQuestion, setNameQuestion] = useState("");

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      quest.length <= 5 ||
      questInformation.length <= 5 ||
      nameQuestion.length <= 5
    ) {
      alert("Todos los campos deben de tener mas de 5 caracteres.");
      return;
    }

    console.log({ quest, questInformation, nameQuestion });

    const data = await ssApi({
      method: "POST",
      url: "/quest",
      data: {
        nameQuestion,
        quest,
        questInformation,
      },
    });

    console.log(data);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameQuestion(value);
  };
  const handleQuillChangeQuest = (value: string) => {
    setQuest(value);
  };
  const handleQuillChangeQuestInformation = (value: string) => {
    setQuestInformatio(value);
  };
  return (
    <>
      <form
        // className="flex rounded-xl border border-border bg-backgroundSecondary sm:p-10"
        onSubmit={handleSend}
      >
        <div>
          <h3>Bienvenido, este espacio es para la realizacion de preguntas</h3>
          <div>
            Nombre de la pregunta:{" "}
            <input
              type="text"
              className="input input-success w-48"
              value={nameQuestion}
              onChange={handleInputChange}
            />
          </div>

          <div className="divider divider-horizontal">Pregunta</div>
          <div className="bg-white">
            <ReactQuill
              theme="snow"
              value={quest}
              onChange={handleQuillChangeQuest}
              className="h-52"
            />
          </div>
          <br />
          <br />
          <div className="divider divider-horizontal">
            Informacion de la pregunta
          </div>
          <div className="bg-white">
            <ReactQuill
              className="h-52"
              theme="snow"
              value={questInformation}
              onChange={handleQuillChangeQuestInformation}
            />
          </div>
          <div className="divider divider-horizontal" />
          <div className="flex  flex-col items-center">
            <button className="btn btn-secondary" type="submit">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Questions;
