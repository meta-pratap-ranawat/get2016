package com.project.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.service.CarService;
import com.project.vo.CarVO;

@Service("carFacade")
public class CarFacade {
	
	@Autowired
	CarService carService;

	public List<CarVO> getCarList() {
		// TODO Auto-generated method stub
		return carService.getCarList();
	}

	public CarVO getCarDetailsById(int parseInt) {
		// TODO Auto-generated method stub
		return carService.getCarDetailsById(parseInt);
	}

	public boolean createCar(CarVO carVo) {
		// TODO Auto-generated method stub
		return carService.createCar(carVo);
	}

}
