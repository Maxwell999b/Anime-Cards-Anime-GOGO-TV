import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <>
      <h3>Yomikomi-chū</h3>
      <CircularProgress style={{ color: "var(--loader-icon)" }} />
    </>
  );
};

export default Loader;
