
package com.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller

public class PageController {

	/**
	 * To map the landing page of the website
	 * @return - The name of the landing page 
	 */
	@RequestMapping("/")
	public String showIndexPage() {
		return "index.html";
	}
	
	
}
