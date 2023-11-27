import DashboardNavigation from "@/components/dashboard/dashboard-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="m-4">
         <DashboardNavigation />
         <div>{children}</div>
      </div>
   );
}
