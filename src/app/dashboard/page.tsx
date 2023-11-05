import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
   return (
      <div className="text-6xl text-primary">
         <h1>Powiększ swojego piekelnika !</h1>
      </div>
   );
};

export default Dashboard;
