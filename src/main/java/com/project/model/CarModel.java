package com.project.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "cars")
public class CarModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	
	
	@Column(name = "make")
	private String make;
	
	@Column(name = "model")
	private String model;
	
	@Column(name = "engineInCC")
	private int engineInCC;
	
	@Column(name = "fuelCapacity")
	private int fuelCapacity;
	
	@Column(name = "milage")
	private int milage;
	
	@Column(name = "price")
	private int price;
	
	@Column(name = "roadTax")
	private int roadTax;
	
	@Column(name = "ac")
	private String ac;
	
	@Column(name = "powerSteering")
	private String powerSteering;
	
	@Column(name = "accessoryKit")
	private String accessoryKit;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	
	
	public String getMake() {
		return make;
	}
	
	public void setMake(String make) {
		this.make = make;
	}
	
	public String getModel() {
		return model;
	}
	
	public void setModel(String model) {
		this.model = model;
	}
	
	public int getEngineInCC() {
		return engineInCC;
	}
	
	public void setEngineInCC(int engineInCC) {
		this.engineInCC = engineInCC;
	}
	
	public int getFuelCapacity() {
		return fuelCapacity;
	}
	
	public void setFuelCapacity(int fuelCapacity) {
		this.fuelCapacity = fuelCapacity;
	}
	
	public int getMilage() {
		return milage;
	}
	
	public void setMilage(int milage) {
		this.milage = milage;
	}
	
	public int getPrice() {
		return price;
	}
	
	public void setPrice(int price) {
		this.price = price;
	}
	
	public int getRoadTax() {
		return roadTax;
	}
	
	public void setRoadTax(int roadTax) {
		this.roadTax = roadTax;
	}
	
	public String getAc() {
		return ac;
	}
	
	public void setAc(String ac) {
		this.ac = ac;
	}
	
	public String getPowerSteering() {
		return powerSteering;
	}
	
	public void setPowerSteering(String powerSteering) {
		this.powerSteering = powerSteering;
	}
	
	public String getAccessoryKit() {
		return accessoryKit;
	}
	
	public void setAccessoryKit(String accessoryKit) {
		this.accessoryKit = accessoryKit;
	}
}