import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import Telemetry from "./pages/Telemetry";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPatient from "./pages/AddPatient";

import ProtectedRoute from "./components/ProtectedRoute";

import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";


export default function App({ dark, setDark }) {

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AuthProvider>

      <SearchProvider>

        <Routes>

          {/* =====================================================
              PUBLIC ROUTES
          ===================================================== */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* =====================================================
              PROTECTED ROUTES
          ===================================================== */}

          <Route element={<ProtectedRoute />}>

            {/* =================================================
                DASHBOARD
            ================================================= */}

            <Route
              path="/"
              element={
                <MainLayout
                  dark={dark}
                  setDark={setDark}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                >
                  <Dashboard />
                </MainLayout>
              }
            />


            {/* =================================================
                PATIENTS
            ================================================= */}

            <Route
              path="/patients"
              element={
                <MainLayout
                  dark={dark}
                  setDark={setDark}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                >
                  <Patients />
                </MainLayout>
              }
            />


            {/* =================================================
                ADD NEW PATIENT
            ================================================= */}

            <Route
              path="/patients/add"
              element={
                <MainLayout
                  dark={dark}
                  setDark={setDark}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                >
                  <AddPatient />
                </MainLayout>
              }
            />


            {/* =================================================
                PATIENT DETAILS
            ================================================= */}

            <Route
              path="/patients/:id"
              element={
                <MainLayout
                  dark={dark}
                  setDark={setDark}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                >
                  <PatientDetails />
                </MainLayout>
              }
            />


            {/* =================================================
                TELEMETRY
            ================================================= */}

            <Route
              path="/telemetry"
              element={
                <MainLayout
                  dark={dark}
                  setDark={setDark}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                >
                  <Telemetry />
                </MainLayout>
              }
            />


            {/* =================================================
                ALERTS
            ================================================= */}

            <Route
              path="/alerts"
              element={
                <MainLayout
                  dark={dark}
                  setDark={setDark}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                >
                  <Alerts />
                </MainLayout>
              }
            />


            {/* =================================================
                ANALYTICS
            ================================================= */}

            <Route
              path="/analytics"
              element={
                <MainLayout
                  dark={dark}
                  setDark={setDark}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                >
                  <Analytics />
                </MainLayout>
              }
            />


            {/* =================================================
                SETTINGS
            ================================================= */}

            <Route
              path="/settings"
              element={
                <MainLayout
                  dark={dark}
                  setDark={setDark}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                >
                  <Settings />
                </MainLayout>
              }
            />


            {/* =================================================
                UNKNOWN ROUTE
            ================================================= */}

            <Route
              path="*"
              element={
                <MainLayout
                  dark={dark}
                  setDark={setDark}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                >
                  <Dashboard />
                </MainLayout>
              }
            />

          </Route>

        </Routes>

      </SearchProvider>

    </AuthProvider>
  );
}


/* =============================================================
   MAIN LAYOUT
   Sidebar + Topbar + Mobile Sidebar
============================================================= */

function MainLayout({
  children,
  dark,
  setDark,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) {

  return (

    <div className="min-h-screen bg-base-200/40">


      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <Sidebar
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
    />


      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}

      {mobileOpen && (

        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="h-full w-72 bg-base-100"
          >

            <Sidebar
              collapsed={false}
              setCollapsed={() => {}}
            />

          </div>

        </div>

      )}


      {/* =====================================================
          MAIN CONTENT AREA
      ===================================================== */}

      <div
        className={`min-h-screen transition-all ${
          collapsed
            ? "lg:pl-20"
            : "lg:pl-64"
        }`}
      >


        {/* =================================================
            TOPBAR
        ================================================= */}

        <Topbar
          dark={dark}
          setDark={setDark}
          onMenu={() => setMobileOpen(true)}
        />


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="mx-auto max-w-[1600px] p-4 md:p-6 xl:p-8">

          {children}

        </main>

      </div>

    </div>

  );
}