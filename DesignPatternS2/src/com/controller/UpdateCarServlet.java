package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.facade.CarFacade;
import com.model.vo.CarVO;

/**
 * Servlet implementation class UpdateCarServlet
 */
@WebServlet("/UpdateCarServlet")
public class UpdateCarServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateCarServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		CarVO carvo = new CarVO();
		PrintWriter out = null;
		System.out.println("request called");
		//System.out.println(request.getParameter("id"));
		try {
			if(request.getParameter("id")==null||request.getParameter("id")==""){
				carvo.setId(-1);
			} else {
				carvo.setId(Integer.parseInt(request.getParameter("id")));
			}
			System.out.println("In try catch block");
			System.out.println(carvo.getId());
			carvo.setMake(request.getParameter("make"));
			carvo.setModel(request.getParameter("model"));
			carvo.setEngineInCC(Integer.parseInt(request.getParameter("engineInCC")));
			carvo.setFuelCapacity(Integer.parseInt(request.getParameter("fuelCapacity")));
			carvo.setMilage(Integer.parseInt(request.getParameter("milage")));
			carvo.setPrice(Integer.parseInt(request.getParameter("price")));
			carvo.setRoadTax(Integer.parseInt(request.getParameter("roadTax")));
			carvo.setAc(Integer.parseInt(request.getParameter("ac")));
			carvo.setPowerSteering(Integer.parseInt(request.getParameter("powerSteering")));
			carvo.setAccessoryKit(Integer.parseInt(request.getParameter("accessoryKit")));	
			CarFacade carfFacade = new CarFacade();
				
			out = response.getWriter();
			if(carfFacade.save(carvo)){
				out.println("<html><body>");
				out.println("<b> Entry Successfully </b>");
				out.println("</body></html>");
				response.setHeader("Refresh", "1;url=ViewcarsController");
			}else{
				out.println("<html><body>");
				out.println("<b> Failure </b>");
				out.println("</body></html>");
				response.setHeader("Refresh", "1;url=ViewcarsController");
			}	
		
		} catch (Exception e) {
			out.println("<html><body>");
			out.println("<b>Error : Fields are not valid</b>");
			out.println("</body></html>");
			response.setHeader("Refresh", "1;url=ViewcarsController");
		}
		
		
				
		
	}
	
	
	
}
