import PropTypes from "prop-types";

const ErrorComponent = ({ onRefresh }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.message}>Oops! Something went wrong.</h2>
        <p style={styles.subMessage}>It looks like we encountered an error. Please try refreshing the page.</p>
        <button style={styles.button} onClick={onRefresh}>
          Refresh Page
        </button>
      </div>
    </div>
  );
};

ErrorComponent.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  card: {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  message: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subMessage: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
  },
};

export default ErrorComponent;
