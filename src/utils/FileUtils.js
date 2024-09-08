import { CSV_FILE_TYPE } from "../constants/CsvConstants";

const WINDOWS_LINE_SEPARATOR = "\r\n";
const UNIX_LINE_SEPARATOR = "\n";
const MAC_LINE_SEPARATOR = "\r";

function getLineSepartor(text) {
	if (text.includes(WINDOWS_LINE_SEPARATOR)) {
		return WINDOWS_LINE_SEPARATOR;
	} else if (text.includes(MAC_LINE_SEPARATOR)) {
		return MAC_LINE_SEPARATOR;
	}
	return UNIX_LINE_SEPARATOR;
}

export async function readCSVFile(event, headerRule, lineRule) {
	const file = event.target.files[0];

	if (file.type !== CSV_FILE_TYPE) {
		alert("Invalid file type. Please upload CSV file.");
		return;
	}

	const text = await file.text();
	const lines = text.split(getLineSepartor(text));
	const headerLine = lines.splice(0, 1).join("");
	const lastlineIndex = lines.length - 1;

	if (!lines[lastlineIndex]) {
		lines.splice(lastlineIndex);
	}

	if (headerLine === headerRule) {
		for (const line of lines) {
			const parts = lineRule(line);
			if (parts) {
				console.log(parts);
			} else {
				console.error("Error", line);
			}
		}
	}
}
