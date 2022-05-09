import Alert from "react-bootstrap/Alert";

const AlertBanner = ({ variant = "danger", children }) => {
  return (
    <Alert variant={variant} aria-label={children}>
      {children}
    </Alert>
  );
};

export default AlertBanner;
