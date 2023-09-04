import { LayoutPage } from "@/components/Layout";
import { Questions } from "@/components/Questions";
import { getIdQuestion } from "@/db/dbQuestion";
import { GetServerSideProps, NextPage } from "next";

interface Props {
	id: number;
}

const QuestPage: NextPage<Props> = ({ id }) => {
	return (
		<LayoutPage title="Hacer una pregunta">
			<div className="p-6">
				<Questions id={Number(id)} />
			</div>
		</LayoutPage>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const id = await getIdQuestion(); // your fetch function here
	return {
		props: {
			id,
		},
	};
};

export default QuestPage;
