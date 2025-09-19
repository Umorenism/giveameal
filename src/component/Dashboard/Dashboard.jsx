
// import Sidebar from '../Dashboard/SideBar';
// import Header from './Header';
// import MainContent from './MainContent';

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-white flex">
//       {/* Fixed Sidebar */}
//       <Sidebar />

//       {/* Right Side: Header + Scrollable MainContent */}
//       <div className="flex-1 ml-[297px]">
//         {/* Fixed Header */}
//         <Header />

//         {/* Scrollable Main Content under fixed header */}
//         <div className="pt-[72px] bg-white"> {/* 72px is header height */}
//           <MainContent />
//         </div>
//       </div>
//     </div>
//   );
// }






// // import Sidebar from "../Dashboard/SideBar";
// // import Header from "./Header";
// // import MainContent from "./MainContent";

// // export default function Dashboard() {
// //   return (
// //     <div className="min-h-screen bg-white flex">
// //       {/* Sidebar (fixed) */}
// //       <Sidebar />

// //       {/* Right Side: Header + Scrollable MainContent */}
// //       <div className="flex-1 md:ml-[297px]">
// //         {/* Fixed Header */}
// //         <Header />

// //         {/* Scrollable Main Content under fixed header */}
// //         <div className="pt-[72px] bg-white">
// //           <MainContent />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






import { useLocation } from "react-router-dom";
import Sidebar from "../Dashboard/SideBar";
import Header from "./Header";
import MainContent from "./MainContent";

export default function Dashboard() {
  const location = useLocation();

  // hide header if route starts with /dashboard/settings
  const hideHeader = location.pathname.startsWith("/dashboard/settings");

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 ml-[297px]">
        {/* Conditionally render header */}
        {!hideHeader && <Header />}

        {/* Scrollable Main Content (adjust padding if header is hidden) */}
        <div className={`${hideHeader ? "pt-0" : "pt-[72px]"} bg-white`}>
          <MainContent />
        </div>
      </div>
    </div>
  );
}
