package com.customer;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.catalina.filters.CorsFilter;

@Path("/CustomerService")
public class CutomerService {

   CustomerDAOInterface user = new CustomerDAO();

   /*
    * for getting all customers list
    * http://localhost:8080/Customer/rest/CustomerService/customers
    * */
   @GET
   @Path("/customers")
   @Produces({ MediaType.APPLICATION_JSON })
   public Response getCustomersList(){
	   List<Customer> employeeList = user.getAllCustomers();
		//Converting list into a generic entity to send it over response
		GenericEntity<List<Customer>> generic = new GenericEntity<List<Customer>>(employeeList){};
		//Sending the response
 	    return Response.ok( generic ).header("Access-Control-Allow-Origin", CorsFilter.DEFAULT_ALLOWED_ORIGINS).build();
   }	
   
   
}
