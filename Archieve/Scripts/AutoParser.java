import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class AutoParser {

	public static void main(String[] args) throws FileNotFoundException {
		FileReader br;
		PrintWriter writer1 = new PrintWriter("yearList.txt");
		PrintWriter writer2 = new PrintWriter("nameList.txt");
		PrintWriter writer3 = new PrintWriter("recordList.txt");
		PrintWriter writer4 = new PrintWriter("nationality.txt");

		// extract the year
		try {
			Scanner scanner = new Scanner(new FileInputStream("src.txt"));

			while (scanner.hasNext()) {
				String temp = scanner.nextLine();

				if (temp.matches(".*>[1-2][0-9]{3}.*")) {
					for (int i = 0; i < temp.length() - 6; i++) {
						String fragment = temp.substring(i, i + 6);
						// System.out.println(fragment);
						if (fragment.matches(".*>[1-2][0-9]{3}")) {
							// System.out.println(fragment);
							String[] array = fragment.split(">");
							String output = array[1];
							writer1.println(output);
							System.out.println(output);
						}
					}
				}
			}
			scanner.close();
			writer1.close();
		} catch (IOException e) {
			System.out.println("failed to load the file!");
		}
		System.out.println("Year extracted!\n\n");

		
		// extract the athlete name
		try {
			Scanner scanner = new Scanner(new FileInputStream("src.txt"));

			while (scanner.hasNext()) {
				String temp = scanner.nextLine();
				// get the year
				if (temp.matches(".*<span title=.*")) {
					for (int i = 0; i < temp.length() - 55; i++) {
						String fragment = temp.substring(i, i + 55);
						// System.out.println(fragment);
						if (fragment.matches("<span title=.*")) {
//							System.out.println(fragment);
							String[] array = fragment.split("=\"");
							String intermediate = array[1];
							String[] output = intermediate.split("\">");
							if (!output[0].equals("datagrid_link")) {
								writer2.println(output[0].replace("\"", ""));
								System.out.println(output[0].replace("\"", ""));
							}
						}
					}
				}
			}
			scanner.close();
			writer2.close();
		} catch (IOException e) {
			System.out.println("failed to load the file!");
		}
		System.out.println("Names extracted!\n\n");

		
		// extract the record
		try {
			Scanner scanner = new Scanner(new FileInputStream("src.txt"));
			while (scanner.hasNext()) {
				String temp = scanner.nextLine();
				// get the record
				if (temp.matches(".*>1?[0-9]+,[0-9]+.*")) {
					for (int i = 0; i < temp.length() - 6; i++) {
						String fragment = temp.substring(i, i + 6);
//						 System.out.println(fragment);
						if (fragment.matches(">1?[0-9]+,[0-9]+.*")) {
							System.out.println(fragment.replace("<", "").replace("/", "").replace(">", ""));
							writer3.println(fragment.replace("<", "").replace("/", "").replace(">", ""));
						}
					}
				}
			}
			scanner.close();
			writer3.close();

		} catch (IOException e) {
			System.out.println("failed to load the file!");
		}
		System.out.println("Records extracted!\n\n");
		
		// extract the nationality
				try {
					Scanner scanner = new Scanner(new FileInputStream("src.txt"));

					while (scanner.hasNext()) {
						String temp = scanner.nextLine();
						// get the year
						if (temp.matches(".*23x16[^a-z][A-Z]{3}.gif[^a-z].class=[^a-z]small.*")) {
							for (int i = 0; i < temp.length() - 9; i++) {
								String fragment = temp.substring(i, i + 9);
								// System.out.println(fragment);
								if (fragment.matches("23x16.*")) {
//									System.out.println(fragment);
									String res = fragment.substring(6, 9);
									writer4.println(res);
									System.out.println(res);
								}
							}
						}
					}
					scanner.close();
					writer4.close();
				} catch (IOException e) {
					System.out.println("failed to load the file!");
				}
				System.out.println("Nations extracted!\n\n");
	}

}
