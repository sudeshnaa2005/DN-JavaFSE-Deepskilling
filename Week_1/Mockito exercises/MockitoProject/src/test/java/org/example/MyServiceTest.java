package org.example;

// Exercise 2: Verifying Interactions
// This test verifies that a method is called with specific arguments

import org.junit.Test;
import static org.mockito.Mockito.*;

public class MyServiceTest {

    @Test
    public void testVerifyInteraction() {
        // Step 1: Create a mock object
        ExternalApi mockApi = mock(ExternalApi.class);

        // Step 2: Call the method with specific arguments
        MyService service = new MyService(mockApi);
        service.fetchData();

        // Step 3: Verify the interaction
        verify(mockApi).getData();
    }
}