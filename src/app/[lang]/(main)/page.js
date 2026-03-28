import Image from "next/image";
import Navbar from "../../components/navbar/Navbar";
import Navlinks from "../../components/navbar/components/Navlinks";
import Header from "./module/home/Header";
import Categories from "./module/home/Categories";
import BestModernSec from "./module/home/BestModernSec";
import { Suspense } from "react";
import PageLoader from "../../utils/loaders/loading.js";
import Blogs from "./module/home/Blogs";
import DealsSec from "./module/home/DealsSec";
import FollowUsSec from "./module/home/FollowUsSec";
import Footer from "./module/home/Footer";

export default function Home() {
  return (
<div className="w-full">
        <Navlinks/>
      <Suspense fallback={<PageLoader />}>
      <Header />
      <Categories />
      <BestModernSec />
      <Blogs />
      <DealsSec />
      <FollowUsSec />
      </Suspense>
    </div>
  );
}
