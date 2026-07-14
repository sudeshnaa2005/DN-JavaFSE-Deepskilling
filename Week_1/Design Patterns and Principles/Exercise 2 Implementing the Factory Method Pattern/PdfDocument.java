
public class PdfDocument implements Document {

    @Override
    public void open() {
        System.out.println("[PdfDocument]  Opening .pdf file in PDF viewer...");
    }

    @Override
    public void save() {
        System.out.println("[PdfDocument]  Saving document in .pdf format...");
    }

    @Override
    public void close() {
        System.out.println("[PdfDocument]  Closing PDF document.");
    }

    @Override
    public String getType() {
        return "PDF Document (.pdf)";
    }
}
