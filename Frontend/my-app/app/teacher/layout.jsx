import React from 'react';
import Footer from "../../components/teacher.components/Footer.jsx"
import Navbar from '../../components/teacher.components/Navbar.jsx';

const teacherLayout = ({children}) => {
  return (
    <>  
    <Navbar />
        <body>
            <div className='min-h-screen'>
                {children}
            </div>
        </body>
        <Footer />
    </>
  );
};

export default teacherLayout;