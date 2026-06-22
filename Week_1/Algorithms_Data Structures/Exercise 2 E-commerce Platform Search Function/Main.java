import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter number of products: ");
        int numProducts = Integer.parseInt(scanner.nextLine().trim());
        Product[] products = new Product[numProducts];
        
        for (int i = 0; i < numProducts; i++) {
            System.out.print("Enter product ID: ");
            String id = scanner.nextLine().trim();
            System.out.print("Enter product name: ");
            String name = scanner.nextLine().trim();
            System.out.print("Enter product category: ");
            String category = scanner.nextLine().trim();
            products[i] = new Product(id, name, category);
        }

        System.out.print("Enter product IDs to search, separated by spaces: ");
        String line = scanner.nextLine().trim();
        String[] searchIds = line.isEmpty() ? new String[0] : line.split("\\s+");

        System.out.println("--- Linear Search ---");
        printSearchResults(products, searchIds, false);

        System.out.println("\n--- Binary Search ---");
        printSearchResults(products, searchIds, true);

        scanner.close();
    }

    private static void printSearchResults(Product[] products, String[] ids, boolean sorted) {
        if (ids.length == 0) {
            System.out.println("No search IDs provided.");
            return;
        }

        for (String id : ids) {
            Product result = sorted
                    ? SearchFunctions.binarySearch(products, id)
                    : SearchFunctions.linearSearch(products, id);
            System.out.println("Search for " + id + ": "
                    + (result != null ? "Found " + result : "Not found"));
        }
    }
}
