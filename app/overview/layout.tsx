import Dashbored from "./_components/dashbored/Dashbored";
import Sidebar from "./_components/sidebar/Sidebar";

export const metadata = {
    title: 'Your Page Title',
    description: 'Description of your page for SEO and accessibility',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full flex'>
            <Sidebar />
            <div className="p-4 bg-muted flex flex-col w-full">
                <div className="h-28">
                    <Dashbored />
                </div>
                <div className="bg-muted p-2 h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;