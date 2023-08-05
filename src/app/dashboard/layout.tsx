import DashboardNavigation from "@/modules/dashboard/dashboard-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="m-4">
         <DashboardNavigation />
         <div className="ml-4">{children}</div>
      </div>
   );
}
