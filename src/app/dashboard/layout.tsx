// import "@/styles/globals.css";
import DashboardNavigation from "@/modules/dashboard/dashboard-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <DashboardNavigation />
         <div>{children}</div>
      </div>
   );
}
