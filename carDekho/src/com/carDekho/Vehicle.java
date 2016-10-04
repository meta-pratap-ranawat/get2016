package com.carDekho;

public class Vehicle {
	private int id;
	private String make;
	private String model;
	private int engineInCC;
	private double fuelCapacity;
	private double milage;
	private double price;
	private double roadTax;
	
	public Vehicle() {
		
	}
	
	public Vehicle(int id, String make, String model, int engineInCC, double fuelCapacity,
			double milage, double price, double roadTax) {
		
		this.id = id;
		this.make = make;
		this.model = model;
		this.engineInCC = engineInCC;
		this.fuelCapacity = fuelCapacity;
		this.milage = milage;
		this.price = price;
		this.roadTax = roadTax;
		
	}
	
	public void setId(int id) {
		
		this.id = id;
		
	}
	
	public int getId() {
		
		return id;
		
	}
	
	public void setMake(String make) {
		
		this.make= make;
		
	}

	
	public String getMake() {
		
		return make;
		
	}
	
	public void setModel(String model) {
		
		this.model = model;
		
	}
	
	public String getModel() {
		
		return model;
		
	}
	
	public void setEngineInCC(int engineInCC) {
		
		this.engineInCC = engineInCC;
		
	}
	
	
	public int getEngineInCC() {
		
		return engineInCC;
		
	}
	
	public void setFuelCapacity(double fuelCapacity) {
		
		this.fuelCapacity = fuelCapacity;
		
	}
	
	public double getFuelCapacity() {
		
		return fuelCapacity;
		
	}
	
	public void setMilage(double milage) {
		
		this.milage = milage;
		
	}
	
	public double getMilage() {
		
		return milage;
		
	}
	
	
	public void setPrice(double price) {
		
		this.price = price;
		
	}
	
	public double getPrice() {
		
		return price;
		
	}
	
	public void setRoadTax(double roadTax) {
		
		this.roadTax = roadTax;
		
	}
	
	public double getRoadTax() {
		
		return roadTax;
		
	}

}
