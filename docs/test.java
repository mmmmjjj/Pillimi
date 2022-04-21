
public class test {

    public static void main(String[] args) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        CSVReader reader;

        reader= new CSVReader(new FileReader(("csv\\일련번호.csv")));

        try {
            reader.readNext();

            String [] nextLine;
            int cnt=0;
            while ((nextLine = reader.readNext()) != null&&cnt++<20) {
                System.out.println(nextLine[0]);
//                Document document = builder.parse("xml\\" + nextLine[0] + "\\EE_DOC_DATA.xml");
                Document document = builder.parse("xml\\" + "195700009" + "\\EE_DOC_DATA.xml");

                Element root = document.getDocumentElement();

                //        System.out.println(root);
                //        System.out.println(root.getFirstChild().getNextSibling().getChildNodes().item(3).getAttributes().getNamedItem("title"));
                for (int k = 1; k < root.getChildNodes().getLength(); k = k + 2) {//section 단계
                    if (root.getChildNodes().item(k) == null) {
                        break;
                    }
                    if (!root.getChildNodes().item(k).getAttributes().getNamedItem("title").toString().replace("title=", "").replace("\"", "").equals("")) {
                        System.out.println(root.getChildNodes().item(k).getAttributes().getNamedItem("title").toString().replace("title=", "").replace("\"", ""));
                    }
                    for (int i = 1; i < root.getFirstChild().getNextSibling().getChildNodes().getLength(); i = i + 2) {//article 단계
                        if (root.getFirstChild().getNextSibling().getChildNodes().item(i) == null) {
                            break;
                        }
                        if (!root.getFirstChild().getNextSibling().getChildNodes().item(i).getAttributes().getNamedItem("title").toString().replace("title=", "").replace("\"", "").equals("")) {
                            System.out.println(root.getFirstChild().getNextSibling().getChildNodes().item(i).getAttributes().getNamedItem("title").toString().replace("title=", "").replace("\"", ""));
                        }
                        for (int j = 1; j < root.getFirstChild().getNextSibling().getChildNodes().getLength(); j = j + 2) {//paragraph 단계
                            if (root.getFirstChild().getNextSibling().getChildNodes().item(i).getChildNodes().item(j) == null) {
                                break;
                            }
                            System.out.println(root.getFirstChild().getNextSibling().getChildNodes().item(i).getChildNodes().item(j).getFirstChild().toString().replace("[#cdata-section: ", "").replace("]", ""));
                        }
                    }
                }
            }
        } catch (CsvValidationException e) {
            e.printStackTrace();
        }


    }
}
