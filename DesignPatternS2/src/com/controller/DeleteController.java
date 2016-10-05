package com.controller;

import java.io.IOException;
import java.io.PrintWriter;
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
 * Servlet implementation class DeleteController
 */
@WebServlet("/DeleteController")
public class DeleteController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		CarFacade carfacade = new CarFacade();
		int carId = -1;
		RequestDispatcher rd = null;
		PrintWriter out = null;
		out = response.getWriter();
		if(request.getParameter("carId")!=null) {
			carId = Integer.parseInt(request.getParameter("carId"));
			if(carfacade.removeById(carId)) {
				out.println("<html><body>");
				out.println("<b> Delete Successfully </b>");
				out.println("</body></html>");
				response.setHeader("Refresh", "1;url=ViewcarsController");
			}else{
				out.println("<html><body>");
				out.println("<b> Failure </b>");
				out.println("</body></html>");
				response.setHeader("Refresh", "1;url=ViewcarsController");
			}	
			
		} else {
			out.println("<html><body>");
			out.println("<b> Broken Url </b>");
			out.println("</body></html>");
			response.setHeader("Refresh", "1;url=ViewcarsController");
		}
	}

}
