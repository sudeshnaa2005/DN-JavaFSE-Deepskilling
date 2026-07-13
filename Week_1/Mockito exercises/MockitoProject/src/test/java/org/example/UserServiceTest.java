package org.example;

// Mockito Exercise 1: Creating and Using Mocks
import org.junit.Test;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Test
    public void testGetUserName() {
        UserService userService = mock(UserService.class);
        when(userService.getUserName(1)).thenReturn("Mock User");
        assertEquals("Mock User", userService.getUserName(1));
    }

    @Test
    public void testIsUserActive() {
        UserService userService = mock(UserService.class);
        when(userService.isUserActive(1)).thenReturn(true);
        assertTrue(userService.isUserActive(1));
    }
}