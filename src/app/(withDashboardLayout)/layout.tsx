import MainLayout from "@/components/layout/MainLayout";


const DashboardLayout = ({children} : {children:React.ReactNode}) => {
    return (
        <div>
            <MainLayout>
        {children}
        </MainLayout>
        </div>
    );
};

export default DashboardLayout;