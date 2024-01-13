import { IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";

const Contacts = () => {
  return (
    <div className="flex flex-col justify-center items-center my-12 h-56 bg-themeColors-bg-2 w-full text-themeColors-text">
      <div className="h-[15%] w-full flex justify-center items-center">
        <p className="text-xl font-semibold">Viewing by appointment only</p>
      </div>
      <div className="h-[50%] flex items-center w-full max-w-[40rem]">
        <a href="mailto:kristjan@sportauto.ee" className="w-[30%] text-[4.5rem] flex justify-center">
          <div className="text-themeColors-accent"><IoMailOutline /></div>
        </a>
        <div className="w-[40%] flex flex-col items-center">
          <p className="text-[1.2rem] font-semibold mb-[0.10rem]">Kristjan Pappa</p>
          <div className="flex justify-center w-full gap-1 mb-[0.5rem]">
            <img src="../flags/english-flag.webp" alt="" className="h-3" />
            <img src="../flags/estonian-flag.png" alt="" className="h-3" />
            <img src="../flags/russian-flag.png" alt="" className="h-3 rotate-180" />
            <img src="../flags/finnish-flag.png" alt="" className="h-3" />
          </div>
          <p className="text-sm">+372 5064403</p>
          <p className="mt-[-.25rem] text-sm">kristjan@sportauto.ee</p>
        </div>
        <a href="tel:+372 5064403" className="w-[30%] text-[4rem] flex justify-center">
          <div className="text-themeColors-accent"><BsTelephone /></div>
        </a>
      </div>
      <div className="h-[15%] flex flex-col items-center">
        <p className="mb-[-.4rem]">Mon - Fri</p>
        <p>10:00 - 18:00</p>
      </div>
    </div>
  );
};

export default Contacts;
