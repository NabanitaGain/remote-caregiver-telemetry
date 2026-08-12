import { useMemo } from "react";
import {
  Activity,
  HeartPulse,
  Users,
  TriangleAlert,
  ArrowUpRight,
  Wifi,
  SearchX,
} from "lucide-react";
import { Link } from "react-router-dom";

import { patients, alerts, telemetry } from "../data/mockData";

import StatCard from "../components/StatCard";
import TelemetryChart from "../components/TelemetryChart";
import PatientTable from "../components/PatientTable";
import AlertTable from "../components/AlertTable";

import { useSearch } from "../context/SearchContext";

export default function Dashboard() {
  // ==========================================
  // GLOBAL SEARCH
  // ==========================================

  const { searchTerm } = useSearch();

  const search = searchTerm.trim().toLowerCase();

  // ==========================================
  // DASHBOARD BASIC DATA
  // ==========================================

  const active = patients.filter(
    (p) => p.status !== "Stable"
  ).length;

  const openAlerts = alerts.filter(
    (a) => a.status === "Open"
  );

  // ==========================================
  // FILTER PATIENTS
  // ==========================================

  const filteredPatients = useMemo(() => {
    // No search → return all patients
    if (!search) {
      return patients;
    }

    return patients.filter((p) => {
      const searchableValues = [
        p.id,
        p.name,
        p.status,
        p.risk,
        p.condition,
        p.caregiver,
        p.room,
        p.gender,
        String(p.age),
      ];

      return searchableValues
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(search)
        );
    });
  }, [search]);

  // ==========================================
  // FILTER ALERTS
  // ==========================================

  const filteredAlerts = useMemo(() => {
    // No search → return all alerts
    if (!search) {
      return alerts;
    }

    return alerts.filter((a) => {
      const searchableValues = [
        a.id,
        a.patient,
        a.type,
        a.value,
        a.severity,
        a.status,
      ];

      return searchableValues
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(search)
        );
    });
  }, [search]);

  // ==========================================
  // PATIENTS REQUIRING ATTENTION
  // ==========================================

  const attentionPatients = filteredPatients.filter(
    (p) => p.status !== "Stable"
  );

  // ==========================================
  // SEARCH RESULT COUNT
  // ==========================================

  const patientResultCount = attentionPatients.length;
  const alertResultCount = filteredAlerts.length;

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">

        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Welcome Back 👋
          </h1>

          <p className="mt-1 text-sm opacity-60">
            Here’s the latest overview of your remote patients.
          </p>
        </div>

        <div className="flex items-center gap-2">

          <span className="badge badge-success gap-1">
            <Wifi size={12} />
            All devices online
          </span>

          <span className="text-xs opacity-50">
            Updated just now
          </span>

        </div>
      </div>


      {/* ======================================
          SEARCH STATUS
      ====================================== */}

      {searchTerm && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">

          <SearchX size={18} className="text-primary" />

          <div className="text-sm">
            Search results for{" "}
            <span className="font-semibold">
              "{searchTerm}"
            </span>
          </div>

          <div className="ml-auto flex gap-2">

            <span className="badge badge-primary badge-sm">
              {patientResultCount} patients
            </span>

            <span className="badge badge-secondary badge-sm">
              {alertResultCount} alerts
            </span>

          </div>
        </div>
      )}


      {/* ======================================
          STAT CARDS
      ====================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Monitored Patients"
          value={patients.length}
          icon={Users}
          trend="+2.4%"
          description="vs last week"
        />

        <StatCard
          title="Active Alerts"
          value={openAlerts.length}
          icon={TriangleAlert}
          trend="+1"
          description="needs review"
        />

        <StatCard
          title="Avg. Heart Rate"
          value="82"
          unit="bpm"
          icon={HeartPulse}
          trend="-2.1%"
          description="last 24 hours"
        />

        <StatCard
          title="Device Uptime"
          value="99.2"
          unit="%"
          icon={Activity}
          trend="+0.6%"
          description="this month"
        />

      </div>


      {/* ======================================
          TELEMETRY + PATIENT RISK
      ====================================== */}

      <div className="grid gap-6 xl:grid-cols-3">

        {/* TELEMETRY */}
        <div className="card border border-base-300 bg-base-100 shadow-sm xl:col-span-2">

          <div className="card-body">

            <div className="flex justify-between">

              <div>
                <h2 className="card-title">
                  Telemetry Overview
                </h2>

                <p className="text-xs opacity-50">
                  Aggregated readings from monitored patients
                </p>
              </div>

              <select className="select select-bordered select-sm">

                <option>
                  Last 24 hours
                </option>

                <option>
                  Last 7 days
                </option>

              </select>

            </div>

            <TelemetryChart data={telemetry} />

          </div>

        </div>


        {/* PATIENT RISK */}
        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div className="flex justify-between">

              <div>
                <h2 className="card-title">
                  Patient Risk
                </h2>

                <p className="text-xs opacity-50">
                  Current monitoring status
                </p>
              </div>

              <Link
                to="/patients"
                className="btn btn-ghost btn-xs"
              >
                View all
              </Link>

            </div>


            <div className="mt-4 space-y-5">

              {[
                [
                  "Stable",
                  patients.filter(
                    (p) => p.status === "Stable"
                  ).length,
                  "bg-success",
                ],

                [
                  "Monitoring",
                  patients.filter(
                    (p) => p.status === "Monitoring"
                  ).length,
                  "bg-info",
                ],

                [
                  "Needs Attention",
                  patients.filter(
                    (p) => p.status === "Needs Attention"
                  ).length,
                  "bg-warning",
                ],

                [
                  "Critical",
                  patients.filter(
                    (p) => p.status === "Critical"
                  ).length,
                  "bg-error",
                ],
              ].map(([label, n, color]) => (

                <div key={label}>

                  <div className="mb-1 flex justify-between text-sm">

                    <span>
                      {label}
                    </span>

                    <b>
                      {n}
                    </b>

                  </div>

                  <progress
                    className={`progress ${color} w-full`}
                    value={n}
                    max={patients.length}
                  />

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>


      {/* ======================================
          PATIENTS REQUIRING ATTENTION
      ====================================== */}

      <div className="card border border-base-300 bg-base-100 shadow-sm">

        <div className="card-body p-0">

          {/* Header */}
          <div className="flex items-center justify-between p-5">

            <div>

              <h2 className="card-title">
                Patients Requiring Attention
              </h2>

              <p className="text-xs opacity-50">

                {searchTerm
                  ? `Matching patients for "${searchTerm}"`
                  : "Prioritize abnormal telemetry readings"}

              </p>

            </div>

            <Link
              to="/patients"
              className="btn btn-primary btn-sm"
            >
              All patients
              <ArrowUpRight size={15} />
            </Link>

          </div>


          {/* Patient Table */}

          {attentionPatients.length > 0 ? (

            <PatientTable
              patients={attentionPatients}
              compact
            />

          ) : (

            /* Empty Search Result */

            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-base-200">

                <SearchX
                  size={24}
                  className="opacity-50"
                />

              </div>

              <h3 className="font-semibold">
                No patients found
              </h3>

              <p className="mt-1 max-w-sm text-sm opacity-60">

                {searchTerm
                  ? `No patients matching "${searchTerm}" were found.`
                  : "There are currently no patients requiring attention."}

              </p>

            </div>

          )}

        </div>

      </div>


      {/* ======================================
          RECENT ALERTS
      ====================================== */}

      <div className="card border border-base-300 bg-base-100 shadow-sm">

        <div className="card-body p-0">

          {/* Header */}

          <div className="flex items-center justify-between p-5">

            <div>

              <h2 className="card-title">
                Recent Alerts
              </h2>

              <p className="text-xs opacity-50">

                {searchTerm
                  ? `Matching alerts for "${searchTerm}"`
                  : "Latest system-generated alerts"}

              </p>

            </div>

            <Link
              to="/alerts"
              className="btn btn-ghost btn-sm"
            >
              View alerts
            </Link>

          </div>


          {/* Alert Table */}

          {filteredAlerts.length > 0 ? (

            <AlertTable
              items={
                searchTerm
                  ? filteredAlerts
                  : filteredAlerts.slice(0, 4)
              }
              onResolve={() => {}}
            />

          ) : (

            /* Empty Search Result */

            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-base-200">

                <SearchX
                  size={24}
                  className="opacity-50"
                />

              </div>

              <h3 className="font-semibold">
                No alerts found
              </h3>

              <p className="mt-1 max-w-sm text-sm opacity-60">

                No alerts matching{" "}
                <span className="font-medium">
                  "{searchTerm}"
                </span>{" "}
                were found.

              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}