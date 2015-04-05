package com.npu.socket;

import java.io.*;
import java.net.InetAddress;
import java.util.Properties;
import java.util.Date;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

public class SMTPSend {

	public SMTPSend() {
	}

	public void msgsend(String receiver, String msgBody) {
		String username = "cs595CapstoneProject@gmail.com";
		String password = "cs595CapstoneProject1";
		String smtphost = "smtp.gmail.com";
		//String compression = "My SMS Compression Information";
		String from = "cs595CapstoneProject1@gmail.com";
		String to = receiver + "@tmomail.net";
		String body = msgBody;
		Transport myTransport = null;

		try {
			Properties props = System.getProperties();
			props.put("mail.smtp.host", "smtp.gmail.com");
			props.put("mail.smtp.socketFactory.port", "465");
			props.put("mail.smtp.socketFactory.class",
					"javax.net.ssl.SSLSocketFactory");
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.port", "465");

			Session mailSession = Session.getDefaultInstance(props, null);
			Message msg = new MimeMessage(mailSession);
			msg.setFrom(new InternetAddress(from));
			InternetAddress[] address = { new InternetAddress(to) };
			msg.setRecipients(Message.RecipientType.TO, address);
			msg.setSubject("ALERT");
			msg.setText(body);
			msg.setSentDate(new Date());

			myTransport = mailSession.getTransport("smtp");
			myTransport.connect(smtphost, username, password);
			msg.saveChanges();
			myTransport.sendMessage(msg, msg.getAllRecipients());
			System.out.println("SMS successfully sent");
			myTransport.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
/**
	public static void main(String[] argv) {
		SMTPSend smtpSend = new SMTPSend();
		smtpSend.msgsend();
	} 
	**/
}
