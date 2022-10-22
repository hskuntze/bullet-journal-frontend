import ContentLoader from "react-content-loader";

const CardLoader = () => {
  const theme = localStorage.getItem("theme");
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={300}
      viewBox="0 0 300 300"
      backgroundColor={theme === 'light' ? '#d7d7d7' : '#676767'}
      foregroundColor={theme === 'light' ? '#f2f2f2' : '#a7a7a7'}
    >
      <rect x="0" y="0" rx="4" ry="4" width="300" height="300" />
    </ContentLoader>
  );
};

export default CardLoader;
