package com.controller;

import java.io.IOException;






import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import com.carDekho.CarFacade;
import com.carDekho.Car;


@SuppressWarnings("serial")
@WebServlet
@Component
public class EditDetails extends HttpServlet {
	

	CarFacade facade;
	

	Car car;
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		
		ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
		
		facade = ctx.getBean(CarFacade.class);
		
		car = ctx.getBean(Car.class);
	
		//Setting the form values to the bean object
		car.setMake(request.getParameter("make"));
		car.setModel(request.getParameter("carDekho"));
		car.setEngineInCC(Integer.parseInt(request.getParameter("engine")));
		car.setFuelCapacity(Double.parseDouble(request.getParameter("fuel")));
		car.setMilage(Double.parseDouble(request.getParameter("milage")));
		car.setPrice(Double.parseDouble(request.getParameter("price")));
		car.setRoadTax(Double.parseDouble(request.getParameter("tax")));
		
		car.setAc(Integer.parseInt(request.getParameter("ac")));
		car.setPowerSteering(Integer.parseInt(request.getParameter("steering")));
		car.setAccessoryKit(Integer.parseInt(request.getParameter("kit")));
		
		
		
		
		
			car.setId(Integer.parseInt(request.getParameter("id")));
		
		
		//Getting the object of Car Facade Class
		RequestDispatcher dispatcher;
		
		boolean result = facade.addUpdateCarDetails(car);
		//Getting the request dispatcher object based upon the operation
		if(result) {
			dispatcher = request.getRequestDispatcher("carlist");
		} else {
			dispatcher = request.getRequestDispatcher("carform");
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
}