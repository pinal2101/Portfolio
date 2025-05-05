import './globals.css'; 
import Link from 'next/link';
export const metadata = {
  title: 'Portfolio Dashboard',
  description: 'Manage your projects efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
            <h1 className="text-2xl font-bold">Portfolio</h1>
            <nav className="flex flex-col gap-4">
              <Link href="/TopicList">TopicList</Link>
              <Link href="/tags">Tags</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/technologies">Technologies</Link>
              <Link href="/addTopic">Add Topic</Link>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
             
              
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
