package com.webservicesRestful;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/EmployeeService")
public class EmployeeService {

   EmployeeDAOInterface user = new EmployeeDAO();

   /*
    * for getting all employee list
    * http://localhost:8080/RestDemoProject/rest/EmployeeService/employees
    * */
   @GET
   @Path("/employees")
   @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
   public List<Employee> getEmployeesList(){
      return user.getAllEmployees();
   }	
   
   
   /*
    * getting employee by Id
    * http://localhost:8080/RestDemoProject/rest/EmployeeService/findById/1
    * */
   @GET
   @Path("/findById/{id}")
   @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
   public Employee getEmployeeById(@PathParam("id") int id){
      return user.findbyId(id);
   }	
   
   
   /*
    * getting employee by name
    * url will be
    * http://localhost:8080/RestDemoProject/rest/EmployeeService/findByName/rohit
    * */
   @GET
   @Path("/findByName/{name}")
   @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
   public List<Employee> getEmployeeByName(@PathParam("name") String name){
      return user.findbyName(name);
   }
   
   
   /*
    * adding new employee
    * url will be 
    * http://localhost:8080/RestDemoProject/rest/EmployeeService/addEmployee/11/Guarav/gaurav@gmail.com/sitapura Jaipur/Trainne
    * */
   @GET
   @Path("/addEmployee/{id}/{name}/{email}/{address}/{profession}")
   @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
   public String addEmployee( @PathParam("id") int id, @PathParam("name") String name,
		   @PathParam("email") String email, @PathParam("address") String address,@PathParam("profession") String profession){
	   
	   Employee employee = new Employee(id,name,email,address,profession);
	   
	   if(user.insert(employee) > 0){
		   
		   return "Successful Added new Employee";
		   
		   }
	   else {
		   
		   return "something is wrong";
	   }
	   
   }
   
   /*
    * deleting Employee 
    * url will be
    * http://localhost:8080/RestDemoProject/rest/EmployeeService/delete/11 
    * */
   @GET
   @Path("/delete/{id}")
   @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
   public Employee deleteEmployeeById(@PathParam("id") int id){
      return user.deleteById(id);
   }
   
   
}
