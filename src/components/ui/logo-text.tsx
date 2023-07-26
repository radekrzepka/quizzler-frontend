import { FC, ReactNode } from "react";

interface logoTextProps {
   children: ReactNode;
}

const LogoText: FC<logoTextProps> = ({ children }) => {
   return (
      <h1 className="bg-gradient-to-r from-text to-primary bg-clip-text text-6xl font-bold text-transparent">
         {children}
      </h1>
   );
};

export default LogoText;
