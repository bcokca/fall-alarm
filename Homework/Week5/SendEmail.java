package com.npu.socket;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {

	private Properties mailServerProperties;
	private Session getMailSession;
	private MimeMessage generateMailMessage;

	public void generateAndSendEmail(String receiever, String emailBody) 
			throws AddressException, MessagingException {

		// Step1
		System.out.println("Setup Mail Server Properties...");
		mailServerProperties = System.getProperties();
		mailServerProperties.put("mail.smtp.port", "587");
		mailServerProperties.put("mail.smtp.auth", "true");
		mailServerProperties.put("mail.smtp.starttls.enable", "true");
	
		// Step2
		System.out.println("Get Mail Session..");
		getMailSession = Session.getDefaultInstance(mailServerProperties, null);
		generateMailMessage = new MimeMessage(getMailSession);
		generateMailMessage.addRecipient(Message.RecipientType.TO,
				new InternetAddress(receiever));
		generateMailMessage.setSubject("Test Email");
		generateMailMessage.setContent(emailBody, "text/html");

		// Step3
		System.out.println("Get Session and Send mail");
		Transport transport = getMailSession.getTransport("smtp");

		transport.connect("smtp.gmail.com", "cs595CapstoneProject@gmail.com", "cs595CapstoneProject1");
		transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
		transport.close();
		System.out.println("Email Successfully sent");
	}
}
