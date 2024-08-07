import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar component */}
            {/* <Navbar/> */}
            <Sidebar />

            {/* Main content area where children components are rendered */}
            <div className="flex flex-1 flex-col overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
