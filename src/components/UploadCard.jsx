import { CSV_FILE_EXTENSION } from "../constants/CsvConstants";
import styles from "../styles/UploadCard.module.css";
import { readCSVFile } from "../utils/FileUtils";

export default function UploadCard({ data }) {
	const { id, text, icon, headerRule, lineRule } = data;
	const inputId = `csv_input-${id}`;

	async function handleFileUpload(event) {
		await readCSVFile(event, headerRule, lineRule);
		event.target.value = null;
	}

	return (
		<label id={styles.csv_label} htmlFor={inputId}>
			<div className={styles.upload_card}>
				{icon}
				Upload {text.toUpperCase()} data as CSV file
				<input
					id={inputId}
					type="file"
					accept={CSV_FILE_EXTENSION}
					onChange={handleFileUpload}
					hidden
				/>
			</div>
		</label>
	);
}
