import ContentLoader from "react-content-loader";

const BtnLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={90}
      height={40}
      viewBox="0 0 90 40"
      backgroundColor="#545E59"
      foregroundColor="#415454"
    >
      <rect x="0" y="0" rx="5" ry="5" width="90" height="40" />
    </ContentLoader>
  );
};

export default BtnLoader;
