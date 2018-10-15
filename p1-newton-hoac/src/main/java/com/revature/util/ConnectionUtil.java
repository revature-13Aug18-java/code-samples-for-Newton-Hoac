package com.revature.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionUtil {
	
	private static Connection connection;
	
//	public static Connection getHardCodedConnection() throws SQLException {
//		String url = "jdbc:oracle:thin:@mydbrevature.cidrrjyvywxg.us-east-1.rds.amazonaws.com:1521:ORCL";
//		String username = "newtonhoac";
//		String password = "";
//		if(connection == null || connection.isClosed()) {
//			connection = DriverManager.getConnection(url, username, password);
//		}
//		return connection;
//	}
	
	public static Connection getConnection() throws IOException, SQLException {
			
			// Updated for servlet integration
			try {
				Class.forName("oracle.jdbc.driver.OracleDriver");
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			
			Properties prop = new Properties();
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			prop.load(loader.getResourceAsStream("connection.properties"));
			String url = prop.getProperty("url");
			String username = prop.getProperty("username");
			String password = prop.getProperty("password");
			if(connection == null || connection.isClosed()) {
				connection = DriverManager.getConnection(url, username, password);
			}
			return connection;
		}
	
}
