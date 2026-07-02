import { useState , useEffect} from "react";
import {useTypewriter, Cursor} from 'react-simple-typewriter';
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
function EmployeeList()
{
    const [employees, setEmployees] = useState([]);

    const [value] = useTypewriter({
        words : ["List", "Details", "Information"],
        loop : true,
        typeSpeed : 120,
        deleteSpeed : 80
    })

    useEffect(()=>{
        EmployeeService.getAllEmployees().then(res=>{
            setEmployees(res.data);  
        })
    },[])


    const deleteEmployee =(id)=>{
        EmployeeService.deleteEmployee(id).then(res=>{
            EmployeeService.getAllEmployees().then(res=>{
                setEmployees(res.data);
            })
            .catch(error=>{
                console.log(error);
            })
        })
    } 


    return (
        <div className="mt-5 pt-5">
           <h3 className="text-center"> Employee {value} <Cursor/> </h3>
            <div className="container">
                <div className="row mt-4">
                    <Link to="/add-emp" className="btn btn-warning" style={{width:"260px"}}> Add Employee</Link>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th> ID  </th>
                                <th> NAME </th>
                                <th> DOJ </th>
                                <th> Department </th>
                                <th> Designation </th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(employee => {
                                    return <tr key={employee.id}>
                                                <td>{employee.id}</td>
                                                <td>{employee.name}</td>
                                                <td>{employee.doj}</td>
                                                <td>{employee.dept.deptName}</td>
                                                <td>{employee.dept.designation}</td>
                                                <td>
<Link to={`/update-emp/${employee.id}`} className="btn btn-success"> Update </Link>
<button className="btn btn-danger ms-3" onClick={(e)=> deleteEmployee(employee.id)}> Delete </button>
                                                </td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default EmployeeList;