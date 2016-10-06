package com.carDekho;

import java.sql.Connection;
import java.sql.SQLException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;





public class ConnectionFactoryTest {
	
	
	ConnectionFactory connectionFactory;

	@Test
	public void testGetConnection() {
		
		ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class); 
    	
    	connectionFactory = ctx.getBean(ConnectionFactory.class);
		
		Connection con = connectionFactory.getConnection();
		
		try {
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}