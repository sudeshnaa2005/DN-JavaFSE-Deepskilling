
public class ExcelDocument implements Document {

    @Override
    public void open() {
        System.out.println("[ExcelDocument] Opening .xlsx file in spreadsheet editor...");
    }

    @Override
    public void save() {
        System.out.println("[ExcelDocument] Saving document in .xlsx format...");
    }

    @Override
    public void close() {
        System.out.println("[ExcelDocument] Closing Excel document.");
    }

    @Override
    public String getType() {
        return "Excel Document (.xlsx)";
    }
}
