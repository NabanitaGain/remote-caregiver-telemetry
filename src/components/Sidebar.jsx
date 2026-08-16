import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Activity,
  BellRing,
  BarChart3,
  Settings,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";


const links = [
  {
    to: "/",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    to: "/patients",
    label: "Patients",
    icon: Users,
  },
  {
    to: "/telemetry",
    label: "Live Telemetry",
    icon: Activity,
  },
  {
    to: "/alerts",
    label: "Alerts",
    icon: BellRing,
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];


export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen = false,
  setMobileOpen = () => {},
}) {

  const { logout } = useAuth();


  /*
  ============================================================
  LOGOUT
  ============================================================
  */

  const handleLogout = () => {
    setMobileOpen(false);
    logout();
  };


  /*
  ============================================================
  NAVIGATION CLICK
  Close sidebar automatically on mobile
  ============================================================
  */

  const handleNavigation = () => {
    setMobileOpen(false);
  };


  return (
    <>
      {/* ======================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}


      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          bottom-0
          z-50
          flex
          flex-col
          border-r
          border-base-300
          bg-base-100
          shadow-xl
          transition-all
          duration-300
          ease-in-out

          /* =========================
             MOBILE
          ========================= */

          w-[280px]

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          /* =========================
             DESKTOP
          ========================= */

          lg:translate-x-0
          lg:shadow-none

          ${
            collapsed
              ? "lg:w-20"
              : "lg:w-64"
          }
        `}
      >

        {/* ====================================================
            LOGO / HEADER
        ==================================================== */}

        <div
          className={`
            flex
            h-20
            shrink-0
            items-center
            border-b
            border-base-300
            px-5

            ${
              collapsed
                ? "lg:justify-center lg:px-3"
                : "gap-3"
            }
          `}
        >

          {/* Logo */}

          <div
            className="
              grid
              h-10
              w-10
              shrink-0
              place-items-center
              rounded-xl
              bg-primary
              text-primary-content
              shadow-sm
            "
          >
            <HeartPulse size={23} />
          </div>


          {/* Brand */}

          {!collapsed && (
            <div className="min-w-0">

              <div className="truncate text-lg font-bold">
                CarePulse
              </div>

              <div className="truncate text-xs opacity-60">
                Remote Care
              </div>

            </div>
          )}


          {/* ==================================================
              MOBILE CLOSE BUTTON
          ================================================== */}

          <button
            onClick={() => setMobileOpen(false)}
            className="
              btn
              btn-ghost
              btn-sm
              btn-circle
              ml-auto
              lg:hidden
            "
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

        </div>


        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <nav
          className="
            flex-1
            space-y-1
            overflow-y-auto
            p-3
          "
        >

          {links.map(
            ({ to, label, icon: Icon }) => (

              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={handleNavigation}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  `
                    group
                    flex
                    min-h-11
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-primary text-primary-content shadow-sm"
                        : "hover:bg-base-200"
                    }

                    ${
                      collapsed
                        ? "lg:justify-center"
                        : ""
                    }
                  `
                }
              >

                <Icon
                  size={19}
                  className="shrink-0"
                />

                {!collapsed && (
                  <span className="truncate">
                    {label}
                  </span>
                )}

              </NavLink>

            )
          )}

        </nav>


        {/* ====================================================
            BOTTOM AREA
        ==================================================== */}

        <div className="shrink-0 border-t border-base-300 p-3">


          {/* ==================================================
              LOGOUT
          ================================================== */}

          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`
              flex
              min-h-11
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              font-medium
              text-error
              transition
              hover:bg-error/10

              ${
                collapsed
                  ? "lg:justify-center"
                  : ""
              }
            `}
          >

            <LogOut
              size={19}
              className="shrink-0"
            />

            {!collapsed && (
              <span>
                Logout
              </span>
            )}

          </button>


          {/* ==================================================
              DESKTOP COLLAPSE BUTTON
          ================================================== */}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              btn
              btn-ghost
              btn-sm
              mt-2
              hidden
              w-full
              lg:flex
            "
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >

            {collapsed ? (

              <ChevronRight size={18} />

            ) : (

              <>
                <ChevronLeft size={18} />
                <span>Collapse</span>
              </>

            )}

          </button>

        </div>

      </aside>
    </>
  );
}