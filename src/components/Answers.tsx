import { useRouter } from "next/router";
import { FC, useState } from "react";
import "react-quill/dist/quill.snow.css";

import { ssApi } from "@/api";
import ReactQuill from "react-quill";
interface Props {
  id: string;
  name_quest: string;
  quest: string;
}

const Answers: FC<Props> = ({ id, name_quest, quest }) => {
  const [answer, setAnswer] = useState("");
  const route = useRouter();

  const handleSaveAnswer = async () => {
    const anser = await ssApi({
      url: "/answer",
      method: "POST",
      data: {
        answer,
        id,
      },
    });
    console.log(answer);
  };

  return (
    <div className="m-2">
      <div className="grid place-content-center">
        <div className=" h-full w-full p-2  bg-emerald-800 rounded-xl">
          <div className="w-full bg-primary rounded-md mb-3">
            <b>
              <h1 className="text-center text-xl">
                Nombre de la pregunta : {name_quest}
              </h1>
            </b>
          </div>
          <div className="w-full bg-primary rounded-md mb-3">
            <b>
              <h1 className="text-center text-xl">Pregunta : {quest}</h1>
            </b>
          </div>
          <div className="w-full bg-primary rounded-lg p-2 mb-3">
            <b>
              <h1 className="text-base ml-2"> Respuesta : </h1>
            </b>
            <div className="bg-white">
              <ReactQuill
                theme="snow"
                value={answer}
                onChange={(e) => setAnswer(e)}
                className="h-52 text-black"
              />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="btn btn-secondary" onClick={handleSaveAnswer}>
            Salvar Respuesta
          </button>
        </div>
      </div>
    </div>
  );
};
export default Answers;
