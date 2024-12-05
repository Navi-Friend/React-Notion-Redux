import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

export default function Wrapper() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col items-center justify-center p-12 flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
