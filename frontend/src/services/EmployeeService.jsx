import axios from 'axios';
const EMPLOYEE_API =
  `${import.meta.env.VITE_API_URL}/api/v1/employees`;
class EmployeeService
{
    addEmployee(employee)
    {
        return axios.post(EMPLOYEE_API,employee);
    }

    getAllEmployees()
    {
        return axios.get(EMPLOYEE_API);
    }

    getEmployeeById(employeeId)
    {
        return axios.get(EMPLOYEE_API+'/'+employeeId);
    }

    updateEmployee(employeeId,employee)
    {
        return axios.put(EMPLOYEE_API+'/'+employeeId,employee);
    }

    deleteEmployee(employeeId)
    {
        return axios.delete(EMPLOYEE_API+'/'+employeeId);
    }    
}
export default new EmployeeService();
