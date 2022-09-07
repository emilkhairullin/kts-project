import React from "react";

import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = React.memo(({ className }) => {
  return (
    <Link to="/" className={className}>
      <img src={logo} alt="logo" />
    </Link>
  );
});
