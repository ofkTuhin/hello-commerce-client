/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsCartFill } from "react-icons/bs";

//  child navigation link interface
export interface IChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  // distructuring the main menu from menu object
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  // get current path
  const pathname = usePathname();

  // scroll to top on route change
  // useEffect(() => {
  //   window.scroll(0, 0);
  // }, [pathname]);
  // const { user, loading, logout } = useAuth();

  // useEffect(() => {
  //   // Example usage of the authentication hook
  //   if (!user && !loading && pathname !== "/login") {
  //     console.log(user);
  //     logout();
  //     redirect("/login");
  //     // Redirect to login or display a login form
  //   }
  // }, [user, loading]);
  // console.log(user);
  return (
    <header
      className={`header z-30 ${settings.sticky_header && "sticky top-0"}`}
    >
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Link href="/" className="text-2xl font-bold">
            Hello Commerce
          </Link>
        </div>
        {/* navbar toggler */}
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer flex items-center lg:hidden text-dark  lg:order-1"
        >
          <svg
            id="show-button"
            className="h-6 fill-current block"
            viewBox="0 0 20 20"
          >
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg
            id="hide-button"
            className="h-6 fill-current hidden"
            viewBox="0 0 20 20"
          >
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>
        {/* /navbar toggler */}

        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
          {settings.search && (
            <Link
              className="border-border text-dark hover:text-primary  mr-5 inline-block border-r pr-5 text-xl  "
              aria-label="search"
              data-search-trigger
              href="/checkout"
            >
              <BsCartFill />
            </Link>
          )}
          <Link
            className="btn btn-outline-primary btn-sm hidden lg:inline-block"
            href="/login"
          >
            Login
          </Link>
          {/* {user ? (
            <Link
              className="btn btn-outline-primary btn-sm hidden lg:inline-block"
              href="/login"
            >
              Login
            </Link>
          ) : (
            <button onClick={() => logout()}>Sign out</button>
          )} */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
