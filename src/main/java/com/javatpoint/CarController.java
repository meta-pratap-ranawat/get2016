package com.javatpoint;


import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;



@SuppressWarnings("serial")
@Controller
public class CarController  {

	
	public void getSomething() {
		//Getting the object of Car Facade Class
		CarFacade facade = CarFacade.getFacade();
		//Getting the request dispatcher object
		RequestDispatcher dispatcher = request.getRequestDispatcher("/view/form.jsp");
		
		if(request.getParameter("id") != null) {
			ServletContext context = getServletContext();
			//Setting the carVO Object to the request context
			context.setAttribute("carvo", facade.getCarDetailsById(Integer.parseInt(request.getParameter("id"))));
		}
		
		try {
			//Closing the Facade Object
			CarFacade.closeFacade();
			//Forwarding the request
			dispatcher.forward(request, response);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ServletException e) {
			e.printStackTrace();
		} finally {
			CarFacade.closeFacade();
		}
	}
	
	@RequestMapping("/carlist")
	public String listCar(ModelMap model) {

		CarFacade facade = CarFacade.getFacade();
		
		model.addAttribute("listOfCars", facade.getCarList());
		return "listcar";
	}
	

	@RequestMapping("/")
	public String getIndex() {

		
		return "index";
	}

	

}