package org.example;

// Exercise 3: Assertions in JUnit
import org.junit.Test;
import static org.junit.Assert.*;

public class AssertionsTest {
    @Test
    public void testAssertions() {

        // Assert equals - checks if 2+3 equals 5
        assertEquals(5, 2 + 3);

        // Assert true - checks if 5 is greater than 3
        assertTrue(5 > 3);

        // Assert false - checks if 5 is NOT less than 3
        assertFalse(5 < 3);

        // Assert null - checks if the value is null
        assertNull(null);
        assertNotNull(new Object());
    }
}