package com.javatpoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloWorldController {

	@RequestMapping("/hello")
	public ModelAndView helloWorld(HttpServletRequest request , HttpServletResponse response){
		
		String name = request.getParameter("name");
		String password = request.getParameter("password");
		
		if(password.equals("admin")){
			String message = "Hello : "+name;
			return new ModelAndView("welcomepage","message",message);
		}else{
			String message = "Sorry Wrong";
			return new ModelAndView("errorpage","message",message);
		} 
	}
}
