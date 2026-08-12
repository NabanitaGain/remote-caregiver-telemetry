import { useState } from "react";
import { Save, Bell, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";


export default function Settings() {

  const { user } = useAuth();

  const [saved, setSaved] = useState(false);

  const [thresholds, setThresholds] = useState({
    spo2: 92,
    heart: 100,
    temp: 38,
  });

  const [notifications, setNotifications] = useState({
    critical: true,
    warning: true,
    daily: true,
  });


  const handleSave = () => {

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1800);

  };


  return (

    <div className="mx-auto max-w-5xl space-y-6">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-1 text-sm opacity-60">
          Configure monitoring preferences, alert thresholds, and notifications.
        </p>

      </div>



      {/* =====================================================
          ALERT THRESHOLDS
      ===================================================== */}

      <div className="card border border-base-300 bg-base-100 shadow-sm">

        <div className="card-body">


          <div className="mb-5 flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck size={20} />
            </div>

            <div>

              <h2 className="card-title">
                Alert Thresholds
              </h2>

              <p className="text-sm opacity-60">
                Configure the values that trigger monitoring alerts.
              </p>

            </div>

          </div>


          <div className="grid gap-5 md:grid-cols-3">


            {/* SpO2 */}

            <label className="form-control">

              <div className="label">

                <span className="label-text font-medium">
                  Minimum SpO₂
                </span>

                <span className="label-text-alt">
                  %
                </span>

              </div>

              <input
                type="number"
                className="input input-bordered"
                value={thresholds.spo2}
                onChange={(e) =>
                  setThresholds({
                    ...thresholds,
                    spo2: e.target.value,
                  })
                }
              />

              <div className="label">

                <span className="label-text-alt opacity-50">
                  Alert when SpO₂ falls below this value
                </span>

              </div>

            </label>



            {/* Heart Rate */}

            <label className="form-control">

              <div className="label">

                <span className="label-text font-medium">
                  Maximum Heart Rate
                </span>

                <span className="label-text-alt">
                  bpm
                </span>

              </div>

              <input
                type="number"
                className="input input-bordered"
                value={thresholds.heart}
                onChange={(e) =>
                  setThresholds({
                    ...thresholds,
                    heart: e.target.value,
                  })
                }
              />

              <div className="label">

                <span className="label-text-alt opacity-50">
                  Alert when heart rate exceeds this value
                </span>

              </div>

            </label>



            {/* Temperature */}

            <label className="form-control">

              <div className="label">

                <span className="label-text font-medium">
                  High Temperature
                </span>

                <span className="label-text-alt">
                  °C
                </span>

              </div>

              <input
                type="number"
                step="0.1"
                className="input input-bordered"
                value={thresholds.temp}
                onChange={(e) =>
                  setThresholds({
                    ...thresholds,
                    temp: e.target.value,
                  })
                }
              />

              <div className="label">

                <span className="label-text-alt opacity-50">
                  Alert when temperature exceeds this value
                </span>

              </div>

            </label>

          </div>



          {/* SAVE */}

          <div className="mt-5 flex justify-end">

            <button
              onClick={handleSave}
              className="btn btn-primary"
            >

              <Save size={17} />

              {saved
                ? "Saved Successfully!"
                : "Save Changes"}

            </button>

          </div>


        </div>

      </div>



      {/* =====================================================
          NOTIFICATIONS
      ===================================================== */}

      <div className="card border border-base-300 bg-base-100 shadow-sm">

        <div className="card-body">


          <div className="mb-4 flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Bell size={20} />
            </div>

            <div>

              <h2 className="card-title">
                Notifications
              </h2>

              <p className="text-sm opacity-60">
                Choose which monitoring events should notify caregivers.
              </p>

            </div>

          </div>



          {/* Critical Alerts */}

          <div className="flex items-center justify-between border-b border-base-200 py-4">

            <div>

              <p className="font-semibold">
                Critical Alerts
              </p>

              <p className="text-sm opacity-50">
                Notify immediately when a critical reading is detected.
              </p>

            </div>

            <input
              type="checkbox"
              className="toggle toggle-error"
              checked={notifications.critical}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  critical: e.target.checked,
                })
              }
            />

          </div>



          {/* Warning Alerts */}

          <div className="flex items-center justify-between border-b border-base-200 py-4">

            <div>

              <p className="font-semibold">
                Warning Alerts
              </p>

              <p className="text-sm opacity-50">
                Notify caregivers about abnormal but non-critical readings.
              </p>

            </div>

            <input
              type="checkbox"
              className="toggle toggle-warning"
              checked={notifications.warning}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  warning: e.target.checked,
                })
              }
            />

          </div>



          {/* Daily Summary */}

          <div className="flex items-center justify-between py-4">

            <div>

              <p className="font-semibold">
                Daily Summary
              </p>

              <p className="text-sm opacity-50">
                Receive a daily summary of patient monitoring activity.
              </p>

            </div>

            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={notifications.daily}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  daily: e.target.checked,
                })
              }
            />

          </div>


        </div>

      </div>



      {/* =====================================================
          CAREGIVER ACCOUNT
      ===================================================== */}

      <div className="card border border-base-300 bg-base-100 shadow-sm">

        <div className="card-body">


          <div className="flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <UserRound size={20} />
            </div>

            <div>

              <h2 className="card-title">
                Caregiver Account
              </h2>

              <p className="text-sm opacity-60">
                Account information for the current caregiver.
              </p>

            </div>

          </div>



          <div className="mt-5 grid gap-4 md:grid-cols-2">


            {/* NAME */}

            <div className="rounded-xl border border-base-300 p-4">

              <p className="text-xs uppercase tracking-wide opacity-50">
                Name
              </p>

              <p className="mt-1 font-semibold">
                {user?.name || "Care Coordinator"}
              </p>

            </div>



            {/* ROLE */}

            <div className="rounded-xl border border-base-300 p-4">

              <p className="text-xs uppercase tracking-wide opacity-50">
                Role
              </p>

              <p className="mt-1 font-semibold">
                Care Coordinator
              </p>

            </div>


          </div>


        </div>

      </div>



      {/* =====================================================
          PROTOTYPE NOTICE
      ===================================================== */}

      <div className="alert alert-info">

        <ShieldCheck size={20} />

        <div>

          <p className="font-semibold">
            Prototype Configuration
          </p>

          <p className="text-sm">
            These settings are part of the capstone prototype.
            They are not connected to real medical monitoring devices.
          </p>

        </div>

      </div>


    </div>

  );

}