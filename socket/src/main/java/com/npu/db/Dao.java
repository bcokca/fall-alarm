package com.npu.db;


//package de.vogella.mysql.first;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class Dao {
	  private Connection connect = null;
	  private Statement statement = null;
	  private PreparedStatement preparedStatement = null;
	  private ResultSet resultSet = null;
	  
	  
	  public ReturnEntity getNurseEmailByDeviceId(String device_id) throws Exception {
	    try {
	      // This will load the MySQL driver, each DB has its own driver
	      Class.forName("com.mysql.jdbc.Driver");
	      // Setup the connection with the DB
	      connect = DriverManager
	          .getConnection("jdbc:mysql://localhost/fallarm-db?"
	              + "user=root&password=arrayent");

	      // Statements allow to issue SQL queries to the database
	      statement = connect.createStatement();
	     
	      // PreparedStatements can use variables and are more efficient
	      preparedStatement = connect
	          .prepareStatement("SELECT n.email, n.phone, p.patient_id  FROM `fallarm-db`.nurse_patient np"
	          		+ " left join nurses n on n.nurse_id = np.nurse_id"
	          		+ " left join patients p on p.patient_id = np.patient_id"
	          		+ " where p.device_id = ?");
	      // "myuser, webpage, datum, summery, COMMENTS from feedback.comments");
	      // Parameters start with 1
	      preparedStatement.setString(1, device_id);
	      resultSet = preparedStatement.executeQuery();
	      
	      ReturnEntity ro = null;
	      while (resultSet.next()) {
		      // It is possible to get the columns via name
		      // also possible to get the columns via the column number
		      // which starts at 1
		      // e.g. resultSet.getSTring(2);
		      String email = resultSet.getString("email");
		      String patientId = resultSet.getString("patient_id");
		      String phone = resultSet.getString("phone");
		      
		      
		      System.out.println("Email: " + email);
		      System.out.println("Patient Id: " + patientId);
		      
		      ro = new ReturnEntity(email, patientId, phone);
		      
		    }
	      return ro;
	      	      
	    } catch (Exception e) {
	      throw e;
	    } finally {
	      close();
	    }

	  }

	
	  // You need to close the resultSet
	  private void close() {
	    try {
	      if (resultSet != null) {
	        resultSet.close();
	      }

	      if (statement != null) {
	        statement.close();
	      }

	      if (connect != null) {
	        connect.close();
	      }
	    } catch (Exception e) {

	    }
	  }

	} 
