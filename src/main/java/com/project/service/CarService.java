package com.project.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.dao.CarDao;
import com.project.model.CarModel;
import com.project.vo.CarVO;

@Service("carService")
@Transactional
public class CarService {
	
	@Autowired
	 private CarDao carDao;
	
	@Autowired
	private ApplicationContext context;


	public List<CarVO> getCarList() {
		
		
		CarVO carVo;
		
		List<CarModel> carModelList;
		List<CarVO> carVoList = new ArrayList<CarVO>();
		
		carModelList = carDao.getCarList();
		
		for(int i=0; i<carModelList.size(); i++){
			
			carVo = context.getBean(CarVO.class);
			
			BeanUtils.copyProperties(carModelList.get(i),carVo);
			
			carVoList.add(carVo);
			
		}
		
		
		return carVoList;
	}


	public CarVO getCarDetailsById(int parseInt) {
		
		CarModel carModel = carDao.getCarDetailsById(parseInt);

		CarVO carVo = context.getBean(CarVO.class);
		
		
		BeanUtils.copyProperties(carModel , carVo);
		return carVo;
	}


	public boolean createCar(CarVO carVo) {
		// TODO Auto-generated method stub
		
		CarModel carModel = context.getBean(CarModel.class);
		
		BeanUtils.copyProperties(carVo , carModel);
		return carDao.createCar(carModel);
	}

}
