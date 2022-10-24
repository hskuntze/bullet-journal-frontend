import ContentLoader from "react-content-loader";

const StreakContentLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={120}
      viewBox="0 0 280 120"
      backgroundColor="#2D3330"
      foregroundColor="#415454"
    >
      <rect x="0" y="0" rx="5" ry="5" width="280" height="120" />
    </ContentLoader>
  );
};

export default StreakContentLoader;
