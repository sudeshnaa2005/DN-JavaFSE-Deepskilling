package org.example;

// Exercise 4: Arrange-Act-Assert (AAA) Pattern, Test Fixtures, Setup and Teardown Methods
import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.*;
public class AAAPatternTest {

    private Calculator calculator;
    @Before
    public void setUp() {
        calculator = new Calculator();
        System.out.println("Setup: Calculator created");
    }
    @After
    public void tearDown() {
        calculator = null;
        System.out.println("Teardown: Calculator destroyed");
    }
    @Test
    public void testAdd() {
        // Arrange
        int a = 2, b = 3;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(5, result);
    }

    // Exercise 4 - Test 2: Testing subtract using AAA pattern
    @Test
    public void testSubtract() {
        // Arrange
        int a = 3, b = 2;

        // Act
        int result = calculator.subtract(a, b);

        // Assert
        assertEquals(1, result);
    }
}