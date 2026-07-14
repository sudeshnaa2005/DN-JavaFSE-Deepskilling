
public class LoggerTest {

    public static void main(String[] args) {

        System.out.println("--- Requesting Logger instance #1 ---");
        Logger logger1 = Logger.getInstance();
        logger1.log("First message from logger1");

        System.out.println("\n--- Requesting Logger instance #2 ---");
        Logger logger2 = Logger.getInstance();
        logger2.log("First message from logger2");

        System.out.println("\n--- Verifying both references point to the same object ---");
        System.out.println("logger1 hashCode: " + System.identityHashCode(logger1));
        System.out.println("logger2 hashCode: " + System.identityHashCode(logger2));

        if (logger1 == logger2) {
            System.out.println("SUCCESS: logger1 and logger2 are the same instance.");
        } else {
            System.out.println("FAILURE: logger1 and logger2 are different instances!");
        }

        System.out.println("\n--- Simulating use across different 'parts' of the application ---");
        simulateServiceA();
        simulateServiceB();
    }

    private static void simulateServiceA() {
        Logger logger = Logger.getInstance();
        logger.log("ServiceA: doing some work...");
    }
    private static void simulateServiceB() {
        Logger logger = Logger.getInstance();
        logger.log("ServiceB: doing some other work...");
    }
}
