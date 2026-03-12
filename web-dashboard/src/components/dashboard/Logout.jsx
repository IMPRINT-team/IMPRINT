import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Logout = ({ className, children }) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children || "Log out"}
    </button>
  );
};

Logout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Logout.defaultProps = {
  className: "",
};

export default Logout;