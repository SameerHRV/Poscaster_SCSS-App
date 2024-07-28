const PosecastDetails = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <p className="text-white-1">ID: {params.id}</p>
    </div>
  );
};

export default PosecastDetails;
