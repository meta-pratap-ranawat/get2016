package com.model.dao;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import jdk.nashorn.internal.ir.annotations.Ignore;

import org.junit.Test;

import com.model.vo.CarVO;

public class CarDAOTest {

	CarDAO carDAO = new CarDAO();

	@Test
	public void testGetAllCars() {

		List<CarVO> list = new ArrayList<CarVO>();
		list = carDAO.getAllCars();
		assertEquals(100, list.size());
	}

	@Test
	public void testFindCarbyId() {
		List<CarVO> list = new ArrayList<CarVO>();
		list = carDAO.findCarbyId(10);
		assertEquals(1, list.size());

	}

	@Test 
	public void testInsert() {
		List<CarVO> list = new ArrayList<CarVO>();
		list = carDAO.findCarbyId(7);
		assertEquals(101, carDAO.insert(list.get(0)));
	}

	@Test
	public void testDeleteById() {
		assertEquals(true, carDAO.deleteById(5));
		
	}

	@Test
	public void testUpdate() {
		List<CarVO> list = new ArrayList<CarVO>();
		list = carDAO.findCarbyId(75);
		CarVO carvo = list.get(0);
		carvo.setModel("BMW s7");
		assertEquals(true, carDAO.update(carvo));
	}
	

}
