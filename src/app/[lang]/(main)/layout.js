import Footer from "./module/home/Footer";
import Navbar from "../../components/navbar/Navbar";

export default function HomeLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
        <Navbar/>
    <main className="grow">
        {children}
    </main>
    <Footer/>
    </div>
  );
}
