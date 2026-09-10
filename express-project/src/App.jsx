import './App.css';
import axios from 'axios';
import { useState } from "react";
import StudentGet from './Component/StudentGet';

function App() {
  const [refresh ,setRefresh]=useState(0)
  const [formData, setFormdata] = useState(
    {
      Firstname: "",
      Lastname: "",
      course: "",
      batch: "",
      Rollnumber: "",
      age: ""
    }

  )

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/student`, formData)
      console.log(response.data)
      alert("Student Add Successfully")
      setRefresh((prev)=>prev + 1)
    } catch (error) {
      console.log("error", error)
    }
  }
  return (
    <div>
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-800"> Add New Student </h1>
            <p className="mt-2 text-slate-500"> Enter student information below </p>
          </div> {/* Form Card */}
          <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <form onSubmit={handleSubmit}> {/* First & Last Name */}
              <div className="grid gap-5 sm:grid-cols-2"> <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700"> First Name </label>
                <input type="text" name="Firstname" value={formData.Firstname} onChange={handleChange} placeholder="Enter first name" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required /> </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700"> Last Name </label>
                  <input type="text" name="Lastname" value={formData.Lastname} onChange={handleChange} placeholder="Enter last name" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
                </div> </div> {/* Course & Batch */}
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700"> Course </label>
                  <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="e.g. CADO" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required /> </div> <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700"> Batch </label>
                  <input type="text" name="batch" value={formData.batch} onChange={handleChange} placeholder="e.g. 2026" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required /> </div> </div>
              {/* Roll Number & Age */} <div className="mt-5 grid gap-5 sm:grid-cols-2"> <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700"> Roll Number </label>
                <input

/>
                <input type="text" name="Rollnumber" value={formData.Rollnumber} onChange={handleChange} placeholder="e.g. CADO-001" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required /> </div> <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700"> Age </label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter age" min="1" max="100" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required /> </div> </div> {/* Button */}
              <button type="submit" className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]" > + Add Student </button>
            </form> </div> </div> </div>

      <StudentGet refresh={refresh}/>
    </div>
  );
}

export default App;
