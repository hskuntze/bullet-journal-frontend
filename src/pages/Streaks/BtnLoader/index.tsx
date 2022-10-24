import ContentLoader from "react-content-loader";

const BtnLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={70}
      height={45}
      viewBox="0 0 70 45"
      backgroundColor="#545E59"
      foregroundColor="#415454"
    >
      <rect x="0" y="0" rx="5" ry="5" width="70" height="45" />
    </ContentLoader>
  );
};

export default BtnLoader;
