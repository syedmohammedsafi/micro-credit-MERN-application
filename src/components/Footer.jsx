import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-8">
          <div>
            <h1 className="font-semibold text-2xl mb-2">MicroCredit</h1>
            <p className="text-gray-400 text-sm">Empowering salaried professionals with quick and easy access to microloans through AI-powered credit assessment.</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Quick Access</h2>
            <ul className="space-y-1">
              <li className="text-gray-400 text-base">About</li>
              <li className="text-gray-400 text-base">Team</li>
              <li className="text-gray-400 text-base">Careers</li>
              <li className="text-gray-400 text-base">Contact</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Legal</h2>
            <ul className="space-y-1">
              <li className="text-gray-400 text-base">Privacy Policy</li>
              <li className="text-gray-400 text-base">Terms of Use</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Contact Us</h2>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm md:text-base flex items-center gap-2"><FaPhone /> +91 9876543210</li>
              <li className="text-gray-400 text-sm md:text-base flex items-center gap-2"> <FaEnvelope /> support@microcredit.com</li>
              <li className="text-gray-400 text-sm md:text-base flex items-center gap-2"> <FaMapMarkerAlt /> 123 Finance Street, Chennai </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Follow Us</h2>
            <ul className="space-y-1">
              <li className="text-gray-400 text-base flex items-center gap-2"> <FaFacebook /> Facebook </li>
              <li className="text-gray-400 text-base flex items-center gap-2"> <FaTwitter /> Twitter </li>
              <li className="text-gray-400 text-base flex items-center gap-2">  <FaYoutube /> Youtube </li>
              <li className="text-gray-400 text-base flex items-center gap-2"> <FaInstagram /> Instagram </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2024 MicroCredit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
