package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.vo.CarVO;
import com.project.facade.CarFacade;
import com.project.utility.*;

@Controller
public class CarController {
	
	@Autowired
	private CarFacade carFacade;	//To get the CarFacae object
	
	/**
	 * To get all the cars list
	 * @return - The list of cars wrapped in a Response Object
	 */
	@RequestMapping(value="/carlist", method=RequestMethod.GET)
	public @ResponseBody Response showCarList() {
		
		//Getting the list of cars
		List<CarVO> carList = carFacade.getCarList();
		
		return new Response(carList);
	}
	
	/**
	 * To get all the details of a car
	 * @param id - The id of the car to get the details
	 * @return - The car details wrapped in a Response Object
	 */
	@RequestMapping(value="/carDetails", method=RequestMethod.GET)
	public @ResponseBody Response showCarDetails(@RequestParam("id") String id) {
		
		//Getting the car details
		CarVO car = carFacade.getCarDetailsById(Integer.parseInt(id));
		
		return new Response(car);
	}
	
	/**
	 * To create of a car
	 * @param id - The id of the car to get the details
	 * @return - The car details wrapped in a Response Object
	 */
	@RequestMapping(value="/createCar", method=RequestMethod.POST)
	public @ResponseBody Response createCarDetails(@RequestBody CarVO carVo) {
		
		//Getting the car details
		boolean result = carFacade.createCar(carVo);
		
		return new Response(result);
	}
}
