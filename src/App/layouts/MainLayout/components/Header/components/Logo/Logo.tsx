import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";

interface LogoProps {
  className: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={className}>
      <img src={logo} alt="logo" />
    </Link>
  );
};
