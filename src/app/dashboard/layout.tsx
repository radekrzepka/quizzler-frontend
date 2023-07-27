import DashboardNavigation from "@/modules/dashboard/dashboard-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="m-6">
         <DashboardNavigation />
         <div className="min-h-[600px] rounded-xl bg-text p-4 text-background">
            {children}
         </div>
      </div>
   );
}
