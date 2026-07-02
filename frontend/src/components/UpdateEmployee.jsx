import { useNavigate ,useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
function UpdateEmployee()
{
    const navigate = useNavigate();
    const {id} = useParams();

    const [name,setName] = useState("");
    const [doj,setDoj] = useState("");
    const [department,setDepartment] = useState({deptName:"",designation:""});


    useEffect(()=>{
        EmployeeService.getEmployeeById(id).then(res=>{
            setName(res.data.name);
            setDoj(res.data.doj);
            setDepartment({
                deptName: res.data.dept.deptName,
                designation: res.data.dept.designation
            })
        })    
    },[])

    const handleCancel=(e)=>{
        e.preventDefault();
        navigate("/");
    }


    const handleUpdate=(e)=>{
    e.preventDefault();
    const updateEmployee={
      name,
      doj,
      dept:{
          deptName: department.deptName,
          designation: department.designation
      }
    }

    EmployeeService.updateEmployee(id,updateEmployee).then(res=>{
        navigate("/");
    })
  }



    return (
        <div className="container mt-5 pt-2">
            <div className="card mt-5 p-3 w-50 offset-3">
                <h4 className="text-center"> Update Employee </h4>
                <form>
                    <label className="my-2">Name:</label>
                    <input type="text" name="name" id="name" className="form-control" autoComplete="off"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}/>

                    <label className="my-2">DOJ:</label>
                    <input type="text" name="doj" id="doj" className="form-control" autoComplete="off"
                    value={doj}
                    onChange={(e)=> setDoj(e.target.value)}/>

                    <label className="my-2">Department:</label>
                    <input type="text" name="deptName" id="deptName" className="form-control" autoComplete="off"
                    value={department.deptName}
                    onChange={(e)=> setDepartment({...department,deptName:e.target.value})}/>


                    <label className="my-2">Designation:</label>
                    <input type="text" name="designation" id="designation" className="form-control" autoComplete="off"
                    value={department.designation}
                    onChange={(e)=> setDepartment({...department,designation:e.target.value})}/>

                    <button className="btn btn-danger float-start mt-3" onClick={handleCancel}> cancel </button>
                    <button className=" btn btn-success float-end mt-3" onClick={handleUpdate}> save </button>
                </form>
            </div>
        </div>
    )
}   
export default UpdateEmployee;
