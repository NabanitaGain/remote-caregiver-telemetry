import { useState } from "react";
import { ArrowLeft, UserPlus, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    patientId: "",
    age: "",
    gender: "",
    room: "",
    condition: "",
    status: "Stable",

    heartRate: "",
    spo2: "",
    temperature: "",
    respiratoryRate: "",

    systolic: "",
    diastolic: "",

    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",

    address: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Patient Data:", formData);

    // Later backend API এখানে connect করবে

    alert("Patient added successfully!");

    navigate("/patients");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/patients")}
            className="btn btn-ghost btn-circle"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              Add New Patient
            </h1>

            <p className="mt-1 opacity-60">
              Add patient information and monitoring details.
            </p>
          </div>
        </div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ================= BASIC INFORMATION ================= */}

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div className="flex items-center gap-3 border-b border-base-300 pb-4">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <UserPlus size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Basic Information
                </h2>

                <p className="text-sm opacity-60">
                  Patient identity and general information
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-4">

              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Patient Name *
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Johnson"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Patient ID */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Patient ID *
                  </span>
                </label>

                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  placeholder="e.g. PT-1001"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Age */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Age *
                  </span>
                </label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 68"
                  className="input input-bordered w-full"
                  min="0"
                  max="120"
                  required
                />
              </div>

              {/* Gender */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Gender *
                  </span>
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Room */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Room / Bed
                  </span>
                </label>

                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  placeholder="e.g. R-204"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Condition */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Medical Condition
                  </span>
                </label>

                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  placeholder="e.g. Hypertension"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Status */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Patient Status
                  </span>
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="Stable">Stable</option>
                  <option value="Monitoring">Monitoring</option>
                  <option value="Needs Attention">
                    Needs Attention
                  </option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

            </div>

          </div>

        </div>


        {/* ================= VITAL SIGNS ================= */}

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div>
              <h2 className="text-lg font-semibold">
                Initial Vital Signs
              </h2>

              <p className="text-sm opacity-60">
                Enter the patient's latest available measurements.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mt-4">

              {/* Heart Rate */}
              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Heart Rate
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="number"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleChange}
                    placeholder="72"
                    className="grow"
                  />

                  <span className="text-sm opacity-60">
                    BPM
                  </span>
                </label>

              </div>


              {/* SpO2 */}
              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    SpO₂
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="number"
                    name="spo2"
                    value={formData.spo2}
                    onChange={handleChange}
                    placeholder="98"
                    className="grow"
                    min="0"
                    max="100"
                  />

                  <span className="text-sm opacity-60">
                    %
                  </span>
                </label>

              </div>


              {/* Temperature */}
              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Temperature
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-2">

                  <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="36.6"
                    className="grow"
                  />

                  <span className="text-sm opacity-60">
                    °C
                  </span>

                </label>

              </div>


              {/* Respiratory Rate */}
              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Respiratory Rate
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-2">

                  <input
                    type="number"
                    name="respiratoryRate"
                    value={formData.respiratoryRate}
                    onChange={handleChange}
                    placeholder="16"
                    className="grow"
                  />

                  <span className="text-sm opacity-60">
                    /min
                  </span>

                </label>

              </div>


              {/* Systolic */}
              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Systolic BP
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-2">

                  <input
                    type="number"
                    name="systolic"
                    value={formData.systolic}
                    onChange={handleChange}
                    placeholder="120"
                    className="grow"
                  />

                  <span className="text-sm opacity-60">
                    mmHg
                  </span>

                </label>

              </div>


              {/* Diastolic */}
              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Diastolic BP
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-2">

                  <input
                    type="number"
                    name="diastolic"
                    value={formData.diastolic}
                    onChange={handleChange}
                    placeholder="80"
                    className="grow"
                  />

                  <span className="text-sm opacity-60">
                    mmHg
                  </span>

                </label>

              </div>

            </div>

          </div>

        </div>


        {/* ================= EMERGENCY CONTACT ================= */}

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div>
              <h2 className="text-lg font-semibold">
                Emergency Contact
              </h2>

              <p className="text-sm opacity-60">
                Contact information for emergency situations.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3 mt-4">

              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Contact Name
                  </span>
                </label>

                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  placeholder="e.g. Michael Johnson"
                  className="input input-bordered"
                />

              </div>


              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Phone Number
                  </span>
                </label>

                <input
                  type="tel"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  placeholder="+880 1XXXXXXXXX"
                  className="input input-bordered"
                />

              </div>


              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Relationship
                  </span>
                </label>

                <select
                  name="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={handleChange}
                  className="select select-bordered"
                >

                  <option value="">
                    Select relationship
                  </option>

                  <option value="Spouse">
                    Spouse
                  </option>

                  <option value="Son">
                    Son
                  </option>

                  <option value="Daughter">
                    Daughter
                  </option>

                  <option value="Parent">
                    Parent
                  </option>

                  <option value="Sibling">
                    Sibling
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>


        {/* ================= ADDITIONAL INFORMATION ================= */}

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div>
              <h2 className="text-lg font-semibold">
                Additional Information
              </h2>

              <p className="text-sm opacity-60">
                Optional patient information.
              </p>
            </div>

            <div className="grid gap-5 mt-4">

              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Address
                  </span>
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Patient address"
                  className="input input-bordered"
                />

              </div>


              <div className="form-control">

                <label className="label">
                  <span className="label-text font-medium">
                    Notes
                  </span>
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes..."
                  className="textarea textarea-bordered min-h-32"
                />

              </div>

            </div>

          </div>

        </div>


        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => navigate("/patients")}
            className="btn btn-ghost"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            <Save size={18} />
            Save Patient
          </button>

        </div>

      </form>

    </div>
  );
}