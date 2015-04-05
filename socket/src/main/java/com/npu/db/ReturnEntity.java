package com.npu.db;

public class ReturnEntity {
	
	private String nurseEmail;
	private String nursePhone;
	private String patientId;
	
	
	public ReturnEntity(String nurseEmail, String patientId, String nursePhone) {
		super();
		this.nurseEmail = nurseEmail;
		this.patientId = patientId;
		this.nursePhone = nursePhone;
	}


	public String getNurseEmail() {
		return nurseEmail;
	}


	public void setNurseEmail(String nurseEmail) {
		this.nurseEmail = nurseEmail;
	}


	public String getPatientId() {
		return patientId;
	}


	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}


	public String getNursePhone() {
		return nursePhone;
	}


	public void setNursePhone(String nursePhone) {
		this.nursePhone = nursePhone;
	}
	


}
