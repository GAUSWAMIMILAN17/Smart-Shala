import Navbar from "../../components/admin.components/Navbar.jsx";
import Footer from "../../components/admin.components/Footer.jsx";

const AdminLayout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="flex-1 overflow-y-auto mt-15">{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AdminLayout;
