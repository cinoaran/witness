import { GiAngelWings } from "react-icons/gi";

const HeaderLogo = ({
  size,
  textColor,
}: {
  size: string;
  textColor: string;
}) => {
  return <GiAngelWings size={size} className={`text-shadow-sm ${textColor}`} />;
};

export default HeaderLogo;
