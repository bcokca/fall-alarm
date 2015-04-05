package com.npu.socket;


import java.net.*;
import java.io.*;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import com.npu.db.Dao;
import com.npu.db.ReturnEntity;

public class EchoServer extends Thread {
	protected Socket clientSocket;
	private Dao dao = new Dao();
	
	public static void main(String[] args) throws IOException {
		ServerSocket serverSocket = null;
		
		try {
			serverSocket = new ServerSocket(10008);
			System.out.println("Connection Socket Created");
			try {
				while (true) {
					System.out.println("Waiting for Connection");
					new EchoServer(serverSocket.accept());
				}
			} catch (IOException e) {
				System.err.println("Accept failed.");
				System.exit(1);
			}
		} catch (IOException e) {
			System.err.println("Could not listen on port: 10008.");
			System.exit(1);
		} finally {
			try {
				serverSocket.close();
			} catch (IOException e) {
				System.err.println("Could not close port: 10008.");
				System.exit(1);
			}
		}
	}

	private EchoServer(Socket clientSoc) {
		clientSocket = clientSoc;
		start();
	}

	public void run() {
		System.out.println("New Communication Thread Started");
		try {
			PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
			BufferedReader in = new BufferedReader(new InputStreamReader( clientSocket.getInputStream()));
			String inputLine;
			while ((inputLine = in.readLine()) != null) {
				System.out.println("Server: " + inputLine);
				out.println(inputLine);
				
				String[] inputArr = inputLine.split("/");
				
				String gyroscope = inputArr[0];
				String accelerometer = inputArr[1];
				String device_id = inputArr[2];
				
				System.out.println("gyroscope value: " + gyroscope);
				System.out.println("accelerometer value: " + accelerometer);
				
				ReturnEntity ro = dao.getNurseEmailByDeviceId(device_id);
				
				//the coming data needs to be in a format of
				//accelerometer,gyroscope,device_id
				//i.e 25.323/32.323/12
				
				// For now we will be just sending device_id
				
				//TODO -- first resolve the data
				//if data is in critique mode
				
				//fetch the device ids information
				
				
				//get the nurse id
				//send an email to the nurse with the device id
				
				/**
				 * SEND EMAIL
				 */
				
				String messageToNurse = "Patient is having an emergency. Patient id is: " + ro.getPatientId();
				
				if(ro.getNurseEmail() != null){

					SendEmail email = new SendEmail();
					try {
						email.generateAndSendEmail(ro.getNurseEmail(), messageToNurse);
					} catch (AddressException e) {
						System.out.println("Address Exception" + e);
					} catch (MessagingException e) {
						System.out.println("Messaging Exception" + e);
					}
				}else{
					System.out.println("Nurse email not found");
				}
				
				
				
				/**
				 * SEND SMS
				 */
				if(ro.getNursePhone() != null){
					SMTPSend smtpSend = new SMTPSend();
					//for now just send whatever user types
					smtpSend.msgsend(ro.getNursePhone(), messageToNurse);
					
					if (inputLine.equals("Bye."))
						break;
				}else{
					System.out.println("Nurse Phone not found");
				}
				
			}

			out.close();
			in.close();
			clientSocket.close();
		} catch (IOException e) {
			System.err.println("Problem with Communication Server");
			System.exit(1);
		} catch (Exception e1) {
			System.err.println("error occured while getting the nurse information: " + e1.getMessage());
			
		}
	}
}
