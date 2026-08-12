import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  HeartPulse,
  Activity,
  Thermometer,
  Wind,
  Droplets,
  Gauge,
  UserRound,
  Clock,
  AlertTriangle
} from "lucide-react";

import { patients } from "../data/mockData";


export default function PatientDetails() {

  // URL থেকে patient ID নেওয়া
  const { id } = useParams();

  // সেই ID অনুযায়ী patient খুঁজে বের করা
  const patient = patients.find(
    (p) => p.id === id
  );


  // Patient না পাওয়া গেলে
  if (!patient) {

    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="text-center">

          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-error/10 p-4 text-error">
              <AlertTriangle size={32} />
            </div>
          </div>

          <h1 className="text-2xl font-bold">
            Patient Not Found
          </h1>

          <p className="mt-2 text-sm opacity-60">
            No patient found with ID: {id}
          </p>

          <Link
            to="/patients"
            className="btn btn-primary mt-5"
          >
            <ArrowLeft size={16} />
            Back to Patients
          </Link>

        </div>

      </div>
    );
  }


  return (

    <div className="space-y-6">


      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <Link
        to="/patients"
        className="btn btn-ghost btn-sm gap-2"
      >
        <ArrowLeft size={16} />
        Back to Patients
      </Link>


      {/* =====================================================
          PATIENT HEADER
      ===================================================== */}

      <div className="card border border-base-300 bg-base-100 shadow-sm">

        <div className="card-body">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              {/* Patient Avatar */}

              <div className="avatar">

                <div className="w-20 rounded-full ring-2 ring-base-300">

                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="h-full w-full object-cover"
                  />

                </div>

              </div>


              {/* Patient Information */}

              <div>

                <h1 className="text-2xl font-bold">
                  {patient.name}
                </h1>

                <p className="mt-1 text-sm opacity-60">
                  {patient.id} · {patient.age} years · {patient.gender}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">

                  <span className="badge badge-outline">
                    Room {patient.room}
                  </span>

                  <span
                    className={`badge ${
                      patient.status === "Stable"
                        ? "badge-success"
                        : patient.status === "Monitoring"
                        ? "badge-info"
                        : patient.status === "Needs Attention"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {patient.status}
                  </span>

                  <span className="badge badge-outline">
                    Risk: {patient.risk}
                  </span>

                </div>

              </div>

            </div>


            {/* Last Seen */}

            <div className="flex items-center gap-2 text-sm opacity-60">

              <Clock size={16} />

              Last seen {patient.lastSeen}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          PATIENT INFORMATION
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-3">


        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <h2 className="card-title">
              <UserRound size={20} />
              Patient Information
            </h2>

            <div className="mt-4 space-y-4">

              <div>
                <p className="text-xs opacity-50">
                  Full Name
                </p>

                <p className="font-medium">
                  {patient.name}
                </p>
              </div>


              <div>
                <p className="text-xs opacity-50">
                  Age
                </p>

                <p className="font-medium">
                  {patient.age} years
                </p>
              </div>


              <div>
                <p className="text-xs opacity-50">
                  Gender
                </p>

                <p className="font-medium">
                  {patient.gender}
                </p>
              </div>


              <div>
                <p className="text-xs opacity-50">
                  Room
                </p>

                <p className="font-medium">
                  {patient.room}
                </p>
              </div>


              <div>
                <p className="text-xs opacity-50">
                  Condition
                </p>

                <p className="font-medium">
                  {patient.condition}
                </p>
              </div>


              <div>
                <p className="text-xs opacity-50">
                  Caregiver
                </p>

                <p className="font-medium">
                  {patient.caregiver}
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            VITALS
        ================================================= */}

        <div className="card border border-base-300 bg-base-100 shadow-sm lg:col-span-2">

          <div className="card-body">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="card-title">
                  Current Vitals
                </h2>

                <p className="text-xs opacity-50">
                  Latest telemetry readings
                </p>

              </div>

              <span className="badge badge-success gap-1">
                <Activity size={12} />
                Live
              </span>

            </div>


            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">


              {/* Heart Rate */}

              <VitalCard
                icon={<HeartPulse size={20} />}
                title="Heart Rate"
                value={patient.vitals.heartRate}
                unit="bpm"
              />


              {/* SpO2 */}

              <VitalCard
                icon={<Droplets size={20} />}
                title="SpO₂"
                value={patient.vitals.spo2}
                unit="%"
                danger={patient.vitals.spo2 < 92}
              />


              {/* Blood Pressure */}

              <VitalCard
                icon={<Gauge size={20} />}
                title="Blood Pressure"
                value={`${patient.vitals.systolic}/${patient.vitals.diastolic}`}
                unit="mmHg"
              />


              {/* Temperature */}

              <VitalCard
                icon={<Thermometer size={20} />}
                title="Temperature"
                value={patient.vitals.temp}
                unit="°C"
                danger={patient.vitals.temp >= 38}
              />


              {/* Respiratory */}

              <VitalCard
                icon={<Wind size={20} />}
                title="Respiratory Rate"
                value={patient.vitals.respiratory}
                unit="/min"
              />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MONITORING STATUS
      ===================================================== */}

      <div className="card border border-base-300 bg-base-100 shadow-sm">

        <div className="card-body">

          <h2 className="card-title">
            Monitoring Status
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">


            <div className="rounded-xl bg-base-200/60 p-4">

              <p className="text-xs opacity-50">
                Current Risk
              </p>

              <p className="mt-1 text-lg font-bold">
                {patient.risk}
              </p>

            </div>


            <div className="rounded-xl bg-base-200/60 p-4">

              <p className="text-xs opacity-50">
                Monitoring Status
              </p>

              <p className="mt-1 text-lg font-bold">
                {patient.status}
              </p>

            </div>


            <div className="rounded-xl bg-base-200/60 p-4">

              <p className="text-xs opacity-50">
                Last Updated
              </p>

              <p className="mt-1 text-lg font-bold">
                {patient.lastSeen}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


/* =============================================================
   VITAL CARD
============================================================= */

function VitalCard({
  icon,
  title,
  value,
  unit,
  danger = false
}) {

  return (

    <div
      className={`rounded-2xl border p-4 ${
        danger
          ? "border-error/30 bg-error/5"
          : "border-base-300 bg-base-200/30"
      }`}
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div
            className={`rounded-lg p-2 ${
              danger
                ? "bg-error/10 text-error"
                : "bg-primary/10 text-primary"
            }`}
          >
            {icon}
          </div>

          <span className="text-sm opacity-60">
            {title}
          </span>

        </div>

      </div>


      <div className="mt-4">

        <span
          className={`text-2xl font-bold ${
            danger ? "text-error" : ""
          }`}
        >
          {value}
        </span>

        <span className="ml-1 text-sm opacity-50">
          {unit}
        </span>

      </div>

    </div>

  );
}