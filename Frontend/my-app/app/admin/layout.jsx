import Navbar from "../../components/admin.components/Navbar.jsx";
import Footer from "../../components/admin.components/Footer.jsx";

const AdminLayout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AdminLayout;
