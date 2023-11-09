import HomeMain from "@/modules/home-page/home-main";
import HomeNavigation from "@/modules/home-page/home-navigation";

const Home = () => {
   return (
      <div className="mx-4 mt-4">
         <HomeNavigation />
         <HomeMain />
      </div>
   );
};

export default Home;
