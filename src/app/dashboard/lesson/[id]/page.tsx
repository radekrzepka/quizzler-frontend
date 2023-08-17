const Lesson = ({
   params,
   searchParams,
}: {
   params: { id: string };
   searchParams: { [key: string]: string | string[] | undefined };
}) => {
   return <div>Lesson {params.id}</div>;
};

export default Lesson;
