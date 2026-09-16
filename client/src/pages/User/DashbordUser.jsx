import { Outlet } from "react-router";
import Header from "../../component/Header";
import Footer from "../../component/Footer";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3EA]">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserDashboard;