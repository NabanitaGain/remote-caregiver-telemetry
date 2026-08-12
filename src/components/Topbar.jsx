import { Bell, Menu, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";

import { alerts } from "../data/mockData";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";


export default function Topbar({ dark, setDark, onMenu }) {

  const [open, setOpen] = useState(false);

  const { searchTerm, setSearchTerm } = useSearch();

  // Logged-in user
  const { user } = useAuth();


  return (

    <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-base-300 bg-base-100/95 px-4 backdrop-blur md:px-6">


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <button
        className="btn btn-ghost btn-square lg:hidden"
        onClick={onMenu}
      >
        <Menu />
      </button>


      {/* =====================================================
          SEARCH BAR
      ===================================================== */}

      <div className="relative hidden max-w-md flex-1 md:block">

        <Search
          className="absolute left-3 top-2.5 opacity-50"
          size={18}
        />

        <input
          type="text"
          className="input input-bordered w-full pl-10"
          placeholder="Search patients, alerts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>


      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div className="ml-auto flex items-center gap-2">


        {/* =================================================
            DARK / LIGHT THEME
        ================================================= */}

        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setDark(!dark)}
          title="Toggle theme"
        >

          {dark ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}

        </button>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div className="relative">

          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setOpen(!open)}
          >

            <Bell size={19} />

            <span className="absolute right-1 top-1 badge badge-error badge-xs"></span>

          </button>


          {open && (

            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-xl">


              {/* Notification Header */}

              <div className="mb-2 flex justify-between font-semibold">

                <span>
                  Notifications
                </span>

                <span className="text-xs opacity-50">

                  {alerts.filter(
                    (a) => a.status === "Open"
                  ).length}{" "}

                  open

                </span>

              </div>


              {/* Notification List */}

              {alerts.slice(0, 3).map((a) => (

                <div
                  key={a.id}
                  className="border-b border-base-200 py-3 last:border-0"
                >

                  <div className="text-sm font-medium">
                    {a.patient}
                  </div>

                  <div className="text-xs opacity-60">
                    {a.type} · {a.time}
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* =================================================
            USER PROFILE
        ================================================= */}

        <div className="hidden items-center gap-3 border-l border-base-300 pl-4 sm:flex">


          {/* USER AVATAR */}

          <div className="avatar">

            <div className="w-10 rounded-full ring-2 ring-base-300">

              <img
                src="/avatars/female1.jpg"
                alt={user?.name || "User"}
                className="h-full w-full object-cover"
              />

            </div>

          </div>


          {/* USER INFORMATION */}

          <div className="hidden xl:block">

            <div className="text-sm font-semibold">

              {user?.name || "Care Coordinator"}

            </div>

            <div className="text-xs opacity-60">

              Care Coordinator

            </div>

          </div>


        </div>


      </div>

    </header>

  );

}