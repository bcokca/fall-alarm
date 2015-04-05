package com.npu.gui;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import java.io.*;
import java.net.*;

public class Simulator {
	
	private final String SERVER_HOST_NAME = new String("127.0.0.1");
	
	private JFrame guiFrame;
	//Create the second JPanel. Add a JLabel and JList and 
	//make use the JPanel is not visible.
	private final JPanel listPanel = new JPanel();
	private JLabel acceloremeterLabel;
	private JTextField acceloremeterInput;
	private JLabel gyroscopeLabel;
	private JTextField gyroscopeInput;
	private JLabel deviceIdLabel;
	private JTextField deviceIdInput;
	private JButton submitButton;
	
	private Socket echoSocket = null;
	private PrintWriter out = null;
    private BufferedReader in = null;
	
	
	
	public void startSimulator(){
		guiFrame = new JFrame();
		//make sure the program exits when the frame closes
		guiFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		guiFrame.setTitle("FALLARM SIMULATOR");
		guiFrame.setSize(300, 250);
		
		//This will center the JFrame in the middle of the screen
		guiFrame.setLocationRelativeTo(null);

		//listPanel.setVisible(true); 
		acceloremeterLabel = new JLabel("Accelerometer:");
		acceloremeterInput = new JTextField(10);
		gyroscopeLabel = new JLabel("Gyroscope      :");
		gyroscopeInput = new JTextField(10);
		deviceIdLabel = new JLabel("Device Id        :");
		deviceIdInput = new JTextField(10);
		
		listPanel.add(acceloremeterLabel);
		listPanel.add(acceloremeterInput);
		listPanel.add(gyroscopeLabel);
		listPanel.add(gyroscopeInput);
		listPanel.add(deviceIdLabel);
		listPanel.add(deviceIdInput);
		
		submitButton = new JButton( "SUBMIT");
		
		//The ActionListener class is used to handle the 
		//event that happens when the user clicks the button. 
		//As there is not a lot that needs to happen we can  
		//define an anonymous inner class to make the code simpler.
		
		submitButton.addActionListener(new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				//This button needs to send information to the server
				
				try {
					
					String msg = acceloremeterInput.getText() + "/" + gyroscopeInput.getText() + "/" + deviceIdInput.getText();
					
					System.out.println("message to send server " + msg );
					
					connectToServer(msg);
				} catch (IOException e1) {
					System.out.println("Error occured when connecting server" + e1.getMessage());
				}
				
			}
		});
		
		//The JFrame uses the BorderLayout layout manager. 
		//Put the two JPanels and JButton in different areas.
		
		guiFrame.add(listPanel, BorderLayout.CENTER); 
		guiFrame.add(submitButton,BorderLayout.SOUTH);
				
		guiFrame.setVisible(true);
		
		
	}

	public void connectToServer(String userInput) throws IOException{
		
        System.out.println ("Attemping to connect to host " + SERVER_HOST_NAME + " on port 10008.");
		
        try {
            echoSocket = new Socket(SERVER_HOST_NAME, 10008);
            out = new PrintWriter(echoSocket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(echoSocket.getInputStream()));
        } catch (UnknownHostException e) {
            System.err.println("Don't know about host: " + SERVER_HOST_NAME);
            System.exit(1);
        } catch (IOException e) {
            System.err.println("Couldn't get I/O for "+ "the connection to: " + SERVER_HOST_NAME);
            System.exit(1);
        }

		out.println(userInput);
	
		
	}

	public void closeConnection() throws IOException{
		
		out.close();
		in.close();
		echoSocket.close();
		
	}
	
	public static void main(String args[]) throws IOException{
		
		Simulator s = new Simulator();
		s.startSimulator();
		
	}
	
	
}
