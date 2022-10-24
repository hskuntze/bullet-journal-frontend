import ContentLoader from "react-content-loader";

const CardContentLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={80}
      viewBox="0 0 300 80"
      backgroundColor="#2D3330"
      foregroundColor="#415454"
    >
      <rect x="0" y="0" rx="5" ry="5" width="300" height="80" />
    </ContentLoader>
  );
};

export default CardContentLoader;
