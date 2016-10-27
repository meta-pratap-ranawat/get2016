package com.project.vo;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;


@Component
@Scope("prototype")
public class CarVO {
	
	private int id;
	private String make;
	private String model;
	private int engineInCC;
	private int fuelCapacity;
	private int milage;
	private int price;
	private int roadTax;
	private String ac;
	private String powerSteering;
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
