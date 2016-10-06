package com.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
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

import com.carDekho.Car;
import com.carDekho.CarFacade;

@SuppressWarnings("serial")
@WebServlet
@Component

public class DetailsOfCar extends HttpServlet{

	
	
	CarFacade facade;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) {

		ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
		
		facade = ctx.getBean(CarFacade.class);
		
		//Getting the request dispatcher object
		RequestDispatcher dispatcher = request.getRequestDispatcher("/view/cardetails.jsp");
		
		ServletContext context = getServletContext();	
		//Setting the carVO Object to the request context
		context.setAttribute("carDetails", (Car) facade.getCarDetailsById(Integer.parseInt(request.getParameter("id"))));
		
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
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		doGet(request, response);
	}
}