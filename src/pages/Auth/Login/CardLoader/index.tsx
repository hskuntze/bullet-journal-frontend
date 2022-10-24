import ContentLoader from "react-content-loader";

const CardLoader = () => {
  const theme = localStorage.getItem("theme");
  return (
    <ContentLoader
      speed={1.5}
      width={300}
      height={300}
      viewBox="0 0 250 50"
      backgroundColor={theme === 'light' ? '#f5f5f5' : '#101211'}
      foregroundColor={theme === 'light' ? '#6b6b6b' : '#bbb'}
    >
      <rect x="0" y="0" rx="4" ry="4" width="250" height="50" />
    </ContentLoader>
  );
};

export default CardLoader;
