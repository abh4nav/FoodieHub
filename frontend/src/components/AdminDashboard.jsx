
import { useEffect, useState } from "react";
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, LogOut } from "lucide-react";
import API from "../services/api";

export default function AdminDashboard({ onLogout, onManageFoods,onManageOrders }) {
      const [stats, setStats] = useState({
    totalFoods: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await API.get("/admin/dashboard");
        setStats(response.data.stats);
      } catch (error) {
        console.error("Failed to fetch dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);
  return (
    <div className="min-h-screen bg-[#FFFBF7] flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-2xl font-extrabold mb-10">
          Foodie<span className="text-orange-500">Hub.</span>
        </h1>

        <p className="text-xs font-bold text-gray-400 uppercase mb-4">
          Admin Menu
        </p>

        <nav className="space-y-3">
          <button className="w-full flex items-center gap-3 rounded-xl bg-orange-100 text-orange-600 px-4 py-3 font-semibold">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={onManageFoods}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-orange-50"
            >
            <UtensilsCrossed size={20} />
            Manage Foods
          </button>

          <button onClick={onManageOrders} className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-orange-50">
            <ShoppingBag size={20} />
            Manage Orders
          </button>
        </nav>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50 mt-12"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <p className="text-sm text-gray-500">Welcome back</p>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Admin Dashboard
          </h2>
          <p className="text-gray-500 mt-2">
            Manage your FoodieHub restaurant from one place.
          </p>
        </div>

        {/* Dashboard Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500 text-sm">Total Food Items</p>
            <h3 className="text-3xl font-bold mt-3">
            {loading ? "..." : stats.totalFoods}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h3 className="text-3xl font-bold mt-3">
            {loading ? "..." : stats.totalOrders}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500 text-sm">Pending Orders</p>
            <h3 className="text-3xl font-bold mt-3">
            {loading ? "..." : stats.pendingOrders}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-3xl font-bold mt-3">
                {loading ? "..." : `₹${stats.totalRevenue}`}
            </h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 bg-white rounded-2xl border p-6">
          <h3 className="text-xl font-bold mb-2">Quick Overview</h3>
          <p className="text-gray-500">
            Your restaurant management dashboard is ready.
            Food and order management will be connected next.
          </p>
        </div>
      </main>
    </div>
  );
}
