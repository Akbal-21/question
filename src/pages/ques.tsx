import { LayoutPage } from "@/components/Layout";
// import { Questions } from "@/components/Questions";
import dynamic from "next/dynamic";

// interface Props {
// id: number;
// }

const Questions = dynamic(() => import("../components/Questions"), {
  loading: () => <p>Cargando...</p>, // Puedes personalizar el mensaje de carga
  ssr: false, // Esto asegura que se cargue solo en el lado del cliente
});

const QuestPage = () => {
  return (
    <LayoutPage title="Hacer una pregunta">
      <div className="p-6">
        <Questions id={Number(1)} />
      </div>
    </LayoutPage>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// 	const id = await getIdQuestion(); // your fetch function here
// 	return {
// 		props: {
// 			id,
// 		},
// 	};
// };

export default QuestPage;
