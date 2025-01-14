import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.clear();

    // Redirect to the login page
    navigate("/");
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
