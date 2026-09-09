import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const StudentGet = ({refresh}) => {
    const [studentinfo, setStudentget] = useState([]);
    const [handlemodel, sethandlemodel] = useState(false);
    const [SelectedID, setSelectedID] = useState(null);

    const [formData, setFormdata] = useState({
        Firstname:"",
        Lastname:"",
        course:"",
        batch:"",
        Rollnumber:"",
        age:""
    });
  const API_URL="";

   
    const handleChange=(e)=>{
        setFormdata({...formData,
            [e.target.name]: e.target.value
    })
    }

    const getstudent = async () => {
        try {
            const response = await axios.get(`${API_URL}/student`);

            console.log(response.data);

            setStudentget(response.data.message || []);
        } catch (error) {
            console.log(error);
        }
    };

    const updatestudent = async(id) =>{
        try {

console.log(id)
console.log(formData)

            const response = await axios.put(`${API_URL}/student/${id}`,formData)
            console.log(response.data)
sethandlemodel(false)
getstudent()

setStudentget((prevstudent)=>
    prevstudent.map((student)=>
        student.id === id ? {
            Firstname: student.firstname,
            Lastname: student.lastname,
            course: student.course,
            batch: student.batch,
            rollnumber: student.rollnumber,
            age: student.age,
        } : student
    )
)
        } catch (error) {
            console.log(error)
            console.log(error.response?.data)
            console.log(error.response?.Status)
        }

    }

 
    const handleEdit=(student)=>{
        setSelectedID(student.id)
setFormdata({
   Firstname :student.firstname,
    Lastname :student.lastname,
    course :student.course,
    batch :student.batch,
    rollnumber :student.rollnumber,
    age :student.age,
})

sethandlemodel(true)
    }

    const deletestudent = async(id)=>{
        // setSelectedID(student.id)
        try {
            const response = await axios.delete(`${API_URL}/student/${id}`)

            setStudentget((prevstudent)=> 
            prevstudent.filter((student)=> student.id !== id)
            )
            console.log(response.data)
            alert("Student Delete Successfully")
        } catch (error) {
            console.log(error)
            alert("Failed Delete Successfully")
        }

    }

    useEffect(() => {
        getstudent();
    }, [refresh]);

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800">
                    Student Management
                </h1>

                <p className="mt-1 text-slate-500">
                    Manage all registered students
                </p>
            </div>

            {/* Table Card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

                {/* Table Header */}
                <div className="border-b border-slate-200 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Students List
                            </h2>

                            <p className="text-sm text-slate-500">
                                Total Students: {studentinfo?.length}
                            </p>
                        </div>

                        <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                       {studentinfo?.length} Students
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">

                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    ID
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Student Name
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Course
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Batch
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Roll Number
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Age
                                </th>

                                 <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Student Edit
                                </th>
                                 <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Student Delete
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">

                            {studentinfo?.map((student , index) => (
                                <tr
                                    key={student.id ?? index}
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                        {student.id}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">

                                            {/* Avatar */}
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                {student.firstname?.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    {student.firstname}{" "}
                                                    {student.lastname}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    Student
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                            {student.course}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {student.batch}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="font-mono text-sm font-medium text-slate-700">
                                            {student.Rollnumber}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {student.age} years
                                    </td>
                                    <td className="px-6 py-6  text-sm text-slate-600">
                                     <button className="bg-blue-800 rounded-xl px-4 py-3 text-white" onClick={(()=>handleEdit(student))} >
                                        Edit
                                    </button>
                                    </td>
                                    <td className="px-6 py-6 text-sm text-slate-600">
                                        <button className="bg-red-800 rounded-xl px-4 py-3 text-white" variant="danger" onClick={(()=>deletestudent(student.id))} >
                                        Delete
                                    </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>


                {/* Empty State */}
                {studentinfo?.length === 0 && (
                    <div className="px-6 py-12 text-center">
                        <p className="text-lg font-medium text-slate-600">
                            No students found
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Add a student to see them here.
                        </p>
                    </div>
                )}

            </div>
{handlemodel && (
    <Modal className="w-[1000px]"
    show={handlemodel}
    onHide={() => sethandlemodel(false)}
    
>
    <Modal.Header closeButton  >
        <Modal.Title>
            Update Student
        </Modal.Title>
    </Modal.Header>

    <Modal.Body>

        <div className="flex gap-4">

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    First Name
                </label>

                <input
                    type="text"
                    name="Firstname"
                    value={formData.Firstname}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 w-full outline-none"
                />
            </div>

 
            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Last Name
                </label>

                <input
                    type="text"
                    name="Lastname"
                    value={formData.Lastname}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none"
                />
            </div>
            </div>


    <br />


<div className="flex gap-4">
            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course
                </label>

                <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. CADO"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Batch
                </label>

                <input
                    type="text"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    placeholder="e.g. 2026"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none"
                />
            </div>

</div>

<br />
<div className="flex gap-4">

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Roll Number
                </label>

                <input
                    type="text"
                    name="rollnumber"
                    value={formData.Rollnumber}
                    onChange={handleChange}
                    placeholder="e.g. CADO-001"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Age
                </label>

                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    min="1"
                    max="100"
                    className="w-[210px] rounded-xl border border-slate-300 px-4 py-2 outline-none"
                />
            </div>
            </div>


    </Modal.Body>


    <Modal.Footer>

        <Button
            variant="secondary"
            onClick={() => sethandlemodel(false)}
        >
            Close
        </Button>

        <Button
            variant="primary"
            onClick={() => updatestudent(SelectedID)}
        >
            Save Change
        </Button>

    </Modal.Footer>

</Modal>
)}
        </div>
    );
};

export default StudentGet;