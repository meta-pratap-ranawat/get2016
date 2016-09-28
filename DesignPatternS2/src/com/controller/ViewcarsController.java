package com.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.facade.CarFacade;
import com.model.vo.CarVO;

/**
 * Servlet implementation class ViewcarsController
 */
@WebServlet(description = "To view list of cars or A car", urlPatterns = { "/ViewcarsController" })
public class ViewcarsController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ViewcarsController() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		CarFacade carfacade = new CarFacade();
		int carId = -1;
		RequestDispatcher rd = null;
		if(request.getParameter("carId")!=null) {
			carId = Integer.parseInt(request.getParameter("carId"));
			List<CarVO> list = carfacade.findById(carId);
			request.setAttribute("cars", list.get(0));
			System.out.println(list);
			request.getRequestDispatcher("/edit.jsp").forward(request, response);
		} else {
			List<CarVO> list = carfacade.findAll();
			request.setAttribute("cars", list);
			System.out.println(list);
			request.getRequestDispatcher("/viewCars.jsp").forward(request, response);
		}
		
	}
}
