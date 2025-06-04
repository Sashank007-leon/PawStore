import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F5F8FA] text-[#1F1F1F] pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Nav Links */}
        <div>
          <ul className="space-y-4 text-[18px] font-poppins">
            <li><Link to="/" className="hover:text-[#E27730] transition">Home</Link></li>
            <li><Link to="/dogs" className="hover:text-[#E27730] transition">Breeds</Link></li>
            <li><Link to="/accessories" className="hover:text-[#E27730] transition">Accessories</Link></li>
            <li><Link to="/blog" className="hover:text-[#E27730] transition">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-[#E27730] transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 font-poppins">Contact</h3>
          <p className="text-lg mb-1 font-poppins">Putalisadak</p>
          <p className="text-lg mb-1 font-poppins">Kathmandu, Nepal</p>
          <p className="text-lg font-poppins">+977-1234567890</p>
        </div>

        {/* Map */}
        <div>
          <iframe
            title="map"
            className="rounded-lg w-full h-48 border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4240.866218230026!2d85.31856097614428!3d27.701165876186238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19688077a1ff%3A0x3ea9b1c08b4234dc!2sMindrisers%20Institute%20of%20Technology!5e1!3m2!1sen!2snp!4v1749016277950!5m2!1sen!2snp"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-base font-poppins">&copy; {new Date().getFullYear()} Pawstore</p>
        <div className="flex space-x-6 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#3b5998] hover:text-[#1d3557]">
            <FaFacebookF />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:text-[#b71c1c]">
            <FaYoutube />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#C13584] hover:text-[#6d214f]">
            <FaInstagram />
          </a>
        </div>
        <p className="text-base font-poppins">Created by Sashank</p>
      </div>
    </footer>
  );
};

export default Footer;