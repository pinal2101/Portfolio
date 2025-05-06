
// "use client";

// import Link from 'next/link';
// import { SearchBar } from './components/SearchBar';
// import ImportExportButtons from './dashboard/components/ImportExportButtons';


// export default  DashboardLayout({ children }) {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-5">
//         <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
//         <nav className="space-y-3">
//           <Link href="/dashboard/tags" className="block text-gray-700 hover:text-black">Tags</Link>
//           <Link href="/dashboard/categories" className="block text-gray-700 hover:text-black">Categories</Link>
//           <Link href="/dashboard/technologies" className="block text-gray-700 hover:text-black">Technologies</Link>
//         </nav>
//       </aside>

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col bg-gray-50">
//         {/* Top Header with Search & Import/Export */}
//         <header className="flex justify-between items-center p-4 bg-white shadow">
//           <SearchBar />
//           <ImportExportButtons />
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


export default function DashboardLayout({ children }) {
  return (
    <div>
      <nav>
        {/* Navigation links */}
      </nav>
      <main>{children}</main>
    </div>
  );
}
