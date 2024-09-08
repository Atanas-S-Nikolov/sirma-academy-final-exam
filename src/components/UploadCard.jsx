import { useDispatch } from "react-redux";
import { CSV_FILE_EXTENSION } from "../constants/CsvConstants";
import styles from "../styles/UploadCard.module.css";
import { readCSVFile } from "../utils/FileUtils";

export default function UploadCard({ data }) {
	const { id, text, icon, headerRule, lineRule, action } = data;
	const uppercasedText = text.toUpperCase();
	const inputId = `csv_input-${id}`;
	const dispatch = useDispatch();

	async function handleFileUpload(event) {
		const objects = await readCSVFile(
			event,
			headerRule,
			lineRule,
			uppercasedText,
		);
		if (objects) {
			dispatch(action(objects));
		}
		event.target.value = null;
	}

	return (
		<label id={styles.csv_label} htmlFor={inputId}>
			<div className={styles.upload_card}>
				{icon}
				Upload {uppercasedText} data as CSV file
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
