import React from "react";
import Navbar from "../../components/student.components/Navbar.jsx"
import Footer from "../../components/student.components/Footer.jsx"

const teacherLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <body>
        <div className="min-h-screen">{children}</div>
      </body>
      <Footer />
    </>
  );
};

export default teacherLayout;
