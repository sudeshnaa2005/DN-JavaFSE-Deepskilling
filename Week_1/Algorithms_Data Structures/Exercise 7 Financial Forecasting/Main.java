import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        double initialValue = 1000.00;
        double growthRate = 0.10;

        System.out.print("Enter initial value (default 1000.00): ");
        String initialLine = sc.nextLine().trim();
        if (!initialLine.isEmpty()) {
            try {
                initialValue = Double.parseDouble(initialLine);
            } catch (NumberFormatException e) {
                System.out.println("Invalid number for initial value; using default.");
            }
        }

        System.out.print("Enter annual growth rate in percent (e.g. 10 for 10%) (default 10): ");
        String growthLine = sc.nextLine().trim();
            if (!growthLine.isEmpty()) {
            try {
                double pct = Double.parseDouble(growthLine);
                growthRate = pct / 100.0;
            } catch (NumberFormatException e) {
                System.out.println("Invalid number for growth rate; using default.");
            }
        }

        System.out.println();
            System.out.print("Enter number of years to project (default 5): ");
            String yearsLine = sc.nextLine().trim();
            int years = 5;
            if (!yearsLine.isEmpty()) {
                try {
                    years = Integer.parseInt(yearsLine);
                    if (years < 0) {
                        System.out.println("Number of years must be non-negative; using default.");
                        years = 5;
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Invalid number for years; using default.");
                    years = 5;
                }
            }
        System.out.println("Initial Value: $" + initialValue);
        System.out.println("Growth Rate:   " + (growthRate * 100) + "%");
        System.out.println();

            for (int year = 1; year <= years; year++) {
            double futureValue = FinancialForecast.predictFutureValue(initialValue, growthRate, year);
            System.out.printf("Year %d: $%.2f%n", year, futureValue);
        }

        sc.close();
    }
}
