import HomeNavigation from "@/modules/home-page/home-navigation";
import HomeMain from "@/modules/home-page/home-main";
import { FC } from "react";

const Home: FC = () => {
   return (
      <div className="mx-4 mt-4">
         <HomeNavigation />
         <HomeMain />
      </div>
   );
};

export default Home;
