import React from "react";
import CustomButton from "../shared/CustomButton";
import { NavLink } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const AppNavbar = () => {
  const [open, setOpen] = React.useState(false);
  const toggleMenu = () => setOpen(!open);

  const navLinkClass = ({ isActive }) =>
    `text-lg font-medium transition-colors md:py-0 py-2 block ${isActive ? "text-blue-600" : "text-gray-600 hover:text-black"}`;

  const { logout } = useAuth();
  return (
    <header className="px-6 md:px-12 lg:px-20 py-4 fixed top-0 left-0 z-30 bg-white w-full flex justify-between items-center border-b border-gray-100">
      {/* left part */}
      <div>
        <NavLink to="/dashboard">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            WanderWise
          </h1>
        </NavLink>
        {/* <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">WanderWise</h1> */}
      </div>

      <Button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-600 hover:text-black focus:outline-none"
        aria-label="Toggle menu"
      >
        <Menu className='h-4 w-4 fill="none" viewBox="0 0 24 24" stroke="currentColor' />
      </Button>
      {/* right part  */}
      <div
        className={`
        fixed inset-x-0 top-[68px] bg-white p-6 shadow-lg border-b border-gray-100 flex flex-col gap-6 transition-all duration-300 ease-in-out
        md:static md:p-0 md:shadow-none md:border-none md:flex md:flex-row md:items-center md:gap-12 lg:gap-16
        ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible md:opacity-100 md:translate-y-0 md:visible"}
      `}
      >
        <nav className="flex flex-col md:flex-row gap-4 md:gap-8 text-lg ">
          {/* <NavLink to={"/trips"} >Trips</NavLink>
                <NavLink to={"/itinerary"} >Itinerary</NavLink>
                <NavLink to={"/baggage"} >Baggage</NavLink> */}
          <NavLink
            to="/trips"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Trips
          </NavLink>
          <NavLink
            to="/itinerary"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Itinerary
          </NavLink>
          <NavLink
            to="/baggage"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Baggage
          </NavLink>
        </nav>

        <div
          onClick={() => {
            logout();
            setOpen(false);
          }}
          className="w-full md:w-auto"
        >
          <CustomButton text="Logout" className="w-full md:w-auto" />
        </div>
        {/* <div onClick={logout}>
                <CustomButton text="Logout"  />
            </div> */}
      </div>
    </header>
  );
};

export default AppNavbar;
