package com.project.dao;


import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.project.model.CarModel;

@Repository("carDao")
@Transactional
public class CarDao {

	@Autowired
	private SessionFactory sessionFactory;	//To create a session for the database operation

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	/**
	 * To get all the cars in a list
	 * @return - A list of cars
	 */
	@SuppressWarnings("unchecked")
	public List<CarModel> getCarList() {
		try {
			//Creating a new session for database interaction
			Session session = sessionFactory.openSession();
			
			//Creating a Criteria query for querying the database
			Criteria criteriaQuery = session.createCriteria(CarModel.class);
			
			return criteriaQuery.list();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * To get the carModel details based on the id 
	 * @param id - The id of the carModel to get the details
	 * @return - The carModel model containing all the details
	 */
	public CarModel getCarDetailsById(int id) {
		try {
			//Creating a new session for database interaction
			Session session = sessionFactory.openSession();
			
			//Creating a Criteria query for querying the database
			Criteria criteriaQuery = session.createCriteria(CarModel.class);
			
			//Adding a restriction on the query to fetch the record
			criteriaQuery.add(Restrictions.eq("id", id));
			
			return (CarModel)criteriaQuery.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	

	/**
	 * To create a new record for the carModel
	 * @param carModel - The CarModel Object containing the fields 
	 * 				which need to be inserted into the database
	 * @return - True if the operation is successful else false
	 */
	public boolean createCar(CarModel carModel) {
		try {
			//Creating a new session for database interaction
			Session session = sessionFactory.openSession();
			
			session.save(carModel);
			//Committing the transaction
			session.getTransaction().commit();
			
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}