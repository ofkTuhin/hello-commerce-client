/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useAuth from "@/hook/useAuth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
  // get current path
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  // scroll to top on route change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user")!)) {
      router.push("/");
    }
  }, []);
  return (
    <header className={`header z-30 sticky top-0`}>
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
          {user ? (
            <button className="btn btn-sm" onClick={() => logout()}>
              Log out
            </button>
          ) : (
            <Link
              className="btn btn-outline-primary btn-sm hidden lg:inline-block"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
