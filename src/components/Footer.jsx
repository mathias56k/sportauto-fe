import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
    return (
      <div className="flex justify-center items-center w-full h-24 gap-10">
        <a href="https://www.facebook.com/Sportauto.ee/" target="_blank">
            <FaFacebookF className="h-10 text-themeColors-text"/>
        </a>
        <a href="https://home.mobile.de/SPORTAUTO#ses" target="_blank">
            <img src="../mobilede.svg" className="h-6" alt="" />
        </a>
      </div>
    );
  };
  
  export default Footer;