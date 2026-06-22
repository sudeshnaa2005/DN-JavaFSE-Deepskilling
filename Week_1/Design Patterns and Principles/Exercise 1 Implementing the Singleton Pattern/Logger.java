import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
public class Logger {
    private static final Logger instance = new Logger();

    private static final DateTimeFormatter TIME_FORMAT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private Logger() {
        System.out.println("Logger instance created.");
    }
    public static Logger getInstance() {
        return instance;
    }
    public void log(String message) {
        String timestamp = LocalDateTime.now().format(TIME_FORMAT);
        System.out.println("[" + timestamp + "] " + message);
    }
}
