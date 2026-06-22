
public class DocumentManagementSystem {

    public static void main(String[] args) {

        System.out.println("========================================");
        System.out.println("   Document Management System Demo");
        System.out.println("========================================\n");

        // --- 1. Use each factory independently ---
        DocumentFactory wordFactory  = new WordDocumentFactory();
        DocumentFactory pdfFactory   = new PdfDocumentFactory();
        DocumentFactory excelFactory = new ExcelDocumentFactory();

        wordFactory.processDocument();
        pdfFactory.processDocument();
        excelFactory.processDocument();

        // --- 2. Show polymorphism: same code, different behaviour ---
        System.out.println("--- Polymorphic processing via factory array ---");
        DocumentFactory[] factories = {
            new WordDocumentFactory(),
            new PdfDocumentFactory(),
            new ExcelDocumentFactory()
        };

        for (DocumentFactory factory : factories) {
            Document doc = factory.createDocument();
            System.out.println("Created: " + doc.getType());
            doc.open();
            doc.save();
            doc.close();
            System.out.println();
        }

        // --- 3. Verify concrete types are correct ---
        System.out.println("--- Type verification ---");
        System.out.println("WordFactory  produces: " + new WordDocumentFactory().createDocument().getType());
        System.out.println("PdfFactory   produces: " + new PdfDocumentFactory().createDocument().getType());
        System.out.println("ExcelFactory produces: " + new ExcelDocumentFactory().createDocument().getType());
    }
}
