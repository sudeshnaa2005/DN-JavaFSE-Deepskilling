package org.example;

// UserService class - the class we will mock
public class UserService {

    public String getUserName(int id) {
        return "Real User";
    }

    public boolean isUserActive(int id) {
        return true;
    }
}