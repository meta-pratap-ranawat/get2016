package com.facade;

import java.util.List;
import com.model.dao.CarDAO;
import com.model.vo.CarVO;
/**
 * 
 * @author Pratap
 *
 */
public class CarFacade {
	CarDAO cardao = new CarDAO();

	/**
	 * return all data
	 * @return
	 */
	public List<CarVO> findAll() {
		return cardao.getAllCars();
	}

	/**
	 * find car by id
	 * @param id
	 * @return
	 */
	public List<CarVO> findById(int id) {
		return cardao.findCarbyId(id);
	}

	/**
	 * save or update carvo data
	 * @param carVO
	 * @return success status
	 */
	public boolean save(CarVO carVO) {

		boolean status = false;
		if (carVO.getId() == 0) {
			int tmp = cardao.insert(carVO);
			if (tmp > 0) {
				status = true;
			}
		} else {
			status = cardao.update(carVO);
		}
		return status;
	}

}
