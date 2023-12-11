// Footer.jsx

import React from "react";
import "../styles/styles.css"; // Importuj plik stylów

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Justyna Toczek</p>
    </footer>
  );
};

export default Footer;
