import ContentLoader from "react-content-loader";

const BtnLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={50}
      viewBox="0 0 250 50"
      backgroundColor="#545E59"
      foregroundColor="#415454"
    >
      <rect x="0" y="0" rx="5" ry="5" width="250" height="50" />
    </ContentLoader>
  );
};

export default BtnLoader;
