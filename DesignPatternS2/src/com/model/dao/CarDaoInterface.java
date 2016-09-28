/**
 * 
 */
package com.model.dao;

import java.util.List;

import com.model.vo.CarVO;

/**
 * @author Kritik Garg
 *
 */
public interface CarDaoInterface {
	/**
	 * return all cars data
	 * @return
	 */
	public List<CarVO> getAllCars() ;
	
	/**
	 * find car by id
	 * @param id
	 * @return
	 */
	public List<CarVO> findCarbyId(int id);
	
	/**
	 * insert carvo in database 
	 * @param carvo
	 * @return
	 */
	public int insert(CarVO carvo);
	
	/**
	 * delete by id
	 * @param id
	 * @return
	 */
	public boolean deleteById(int id);
	
	/**
	 * update carvo data
	 * @param carvo
	 * @return
	 */
	public boolean update(CarVO carvo);
}
