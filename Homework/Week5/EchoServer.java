package com.npu.socket;


import java.net.*;
import java.io.*;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class EchoServer extends Thread {
	protected Socket clientSocket;
	
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
				
				//TODO -- first resolve the data
				//if data is in critique mode
				
				//fetch the device ids information
				//get the nurse id
				//send an email to the nurse with the device id
				
				/**
				 * SEND EMAIL
				 */
				SendEmail email = new SendEmail();
				//for now just send the data that user types.
				String emailBody = inputLine;
				try {
					email.generateAndSendEmail("bcokca@gmail.com", emailBody);
				} catch (AddressException e) {
					System.out.println("Address Exception" + e);
				} catch (MessagingException e) {
					System.out.println("Messaging Exception" + e);
				}
				
				
				/**
				 * SEND SMS
				 */
				SMTPSend smtpSend = new SMTPSend();
				//for now just send whatever user types
				smtpSend.msgsend("5109901855", inputLine);
				
				if (inputLine.equals("Bye."))
					break;
			}

			out.close();
			in.close();
			clientSocket.close();
		} catch (IOException e) {
			System.err.println("Problem with Communication Server");
			System.exit(1);
		}
	}
}
