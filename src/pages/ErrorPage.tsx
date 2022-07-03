import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { METAMASK_EXTENSION_LINK, paths } from "../constants";

const ErrorPage: React.FC<{ errorTitle?: string }> = ({ errorTitle }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.ethereum) {
      window.open(METAMASK_EXTENSION_LINK);
    } else {
      navigate(paths.Login);
    }
  }, [window.ethereum]);

  return (
    <h1 className="text-3xl text-center">
      {errorTitle ? errorTitle : "Sorry, this page doesn't exist"}
    </h1>
  );
};

export default ErrorPage;
