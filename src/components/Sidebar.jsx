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
  LogOut
} from "lucide-react";

import { useAuth } from "../context/AuthContext";


const links = [
  {
    to: "/",
    label: "Overview",
    icon: LayoutDashboard
  },
  {
    to: "/patients",
    label: "Patients",
    icon: Users
  },
  {
    to: "/telemetry",
    label: "Live Telemetry",
    icon: Activity
  },
  {
    to: "/alerts",
    label: "Alerts",
    icon: BellRing
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: BarChart3
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings
  }
];


export default function Sidebar({
  collapsed,
  setCollapsed
}) {

  const { logout } = useAuth();


  return (

    <aside
      className={`
        hidden
        lg:flex
        fixed
        left-0
        top-0
        bottom-0
        z-40
        flex-col
        border-r
        border-base-300
        bg-base-100
        transition-all
        ${collapsed ? "w-20" : "w-64"}
      `}
    >


      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="flex h-20 items-center gap-3 border-b border-base-300 px-5">

        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-content">

          <HeartPulse size={23} />

        </div>


        {!collapsed && (

          <div>

            <div className="text-lg font-bold">
              CarePulse
            </div>

            <div className="text-xs opacity-60">
              Remote Care
            </div>

          </div>

        )}

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="flex-1 space-y-1 p-3">

        {links.map(
          ({ to, label, icon: Icon }) => (

            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                transition

                ${
                  isActive
                    ? "bg-primary text-primary-content shadow-sm"
                    : "hover:bg-base-200"
                }

                ${collapsed ? "justify-center" : ""}
                `
              }
            >

              <Icon size={19} />

              {!collapsed && (
                <span>
                  {label}
                </span>
              )}

            </NavLink>

          )
        )}

      </nav>


      {/* =====================================================
          LOGOUT BUTTON
      ===================================================== */}

      <div className="px-3 pb-2">

        <button
          onClick={logout}
          className={`
            flex
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

            ${collapsed ? "justify-center" : ""}
          `}
        >

          <LogOut size={19} />

          {!collapsed && (
            <span>
              Logout
            </span>
          )}

        </button>

      </div>


      {/* =====================================================
          COLLAPSE BUTTON
      ===================================================== */}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="m-3 btn btn-ghost btn-sm"
      >

        {collapsed ? (

          <ChevronRight size={18} />

        ) : (

          <>
            <ChevronLeft size={18} />
            Collapse
          </>

        )}

      </button>

    </aside>

  );
}