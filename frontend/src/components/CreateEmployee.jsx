import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmployeeService from "../services/EmployeeService";
function CreateEmployee()
{
    const [employees, setEmployees] = useState({
        name:"",
        doj:"",
        dept:{
            deptName:"",
            designation:""
        }
    });

    const [errors, setErrors] = useState({
        name:"",
        doj:"",
        deptName:"",
        designation:""
    });

    const navigate = useNavigate();

    const handleCancel =(e)=>{
        e.preventDefault();
        navigate("/");
    }

    const handleChange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        if(name=="name" || name=="doj")
        {
               setEmployees({...employees,[name]:value}); 
        }
        else
        {
            setEmployees({...employees,dept:{...employees.dept,[name]:value}});
        }
        setErrors({...errors,[name]:""});    
    }

    const handleSave=(e)=>{
        e.preventDefault();
        if(validate())
        {
                const formattedDate = dateFormat(employees.doj);

                const employeeData = {
                    ...employees,doj:formattedDate
                }

                EmployeeService.addEmployee(employeeData).then(res=>{
                navigate("/");
                })
        }
    }

     const dateFormat=(date)=>{
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2,"0");
        const month = String(d.getMonth()+1).padStart(2,"0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }



    const validate=(e)=>{
        const formErrors = {};
        let isValid=true;

        if(!employees.name)
        {
            formErrors.name="Name is mandatory";
            isValid=false;
        }
        if(!employees.doj)
        {
            formErrors.doj="Date is mandatory";
            isValid=false;
        }
        if(!employees.dept.deptName)
        {
            formErrors.deptName="Department name is mandatory";
            isValid=false;
        }
        if(!employees.dept.designation)
        {
            formErrors.designation="Designation is mandatory";
            isValid=false;
        }
        setErrors(formErrors);
        return isValid;
    }


    return (
        <div className="container mt-5 pt-1">
        <div className="card mt-5 w-50 offset-3 p-4">
            <h4 className="text-center"> Add Employee </h4>
            <form>
            <label>Name:</label>
            <input type="text" name="name" id="name" 
            className="form-control" autoComplete="off"
            value={employees.name}
            onChange={handleChange}/>
            {errors.name && <small className="text-danger"> {errors.name}</small>}
            <br/>

             <label>DOJ:</label>
            <input type="date" name="doj" id="doj"
             className="form-control"  autoComplete="off"
            value={employees.doj}
             onChange={handleChange}/>
              {errors.doj && <small className="text-danger"> {errors.doj}</small>}
               <br/>

             <label>Department:</label>
            <input type="text" name="deptName" id="deptName" 
            className="form-control"   autoComplete="off"
            value={employees.dept.deptName}
             onChange={handleChange}/>
              {errors.deptName && <small className="text-danger"> {errors.deptName}</small>}
               <br/>

             <label>Designation:</label>
            <input type="text" name="designation" id="designation" 
            className="form-control"  autoComplete="off"
            value={employees.dept.designation}
             onChange={handleChange}/>
            {errors.designation && <small className="text-danger"> {errors.designation}</small>}
             <br/>

            <button className="btn btn-danger w-25 float-start mt-4" onClick={handleCancel}> cancel </button>
            <button className="btn btn-success w-25 float-end mt-4" onClick={handleSave}> save </button>
            </form>
        </div>     
        </div>
    )
}
export default CreateEmployee;
