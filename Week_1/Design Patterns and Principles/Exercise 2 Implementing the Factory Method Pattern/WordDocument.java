public class WordDocument implements Document {

    @Override
    public void open() {
        System.out.println("[WordDocument] Opening .docx file in Word editor...");
    }

    @Override
    public void save() {
        System.out.println("[WordDocument] Saving document in .docx format...");
    }

    @Override
    public void close() {
        System.out.println("[WordDocument] Closing Word document.");
    }

    @Override
    public String getType() {
        return "Word Document (.docx)";
    }
}
