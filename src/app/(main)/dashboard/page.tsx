export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-gray-600">
        Use the sidebar to navigate between your profile, orders, and account
        settings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <a
          href="/dashboard/profile"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">Profile</h3>
          <p className="text-gray-500">View and edit your account details.</p>
        </a>

        <a
          href="/dashboard/orders"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-gray-500">
            Check your order history and statuses.
          </p>
        </a>
      </div>
    </div>
  );
}
