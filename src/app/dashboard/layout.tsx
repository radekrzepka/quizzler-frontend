import DashboardNavigation from "@/modules/dashboard/dashboard-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="m-4">
         <DashboardNavigation />
         <div className="shadow-shadow min-h-[600px] rounded-xl border-[1px] border-borderContainer bg-background p-4 text-text shadow-containerShadow">
            {children}
         </div>
      </div>
   );
}
