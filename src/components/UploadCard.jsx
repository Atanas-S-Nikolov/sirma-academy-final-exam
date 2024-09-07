import styles from "../styles/UploadCard.module.css";

export default function UploadCard({ data }) {
	const { text, icon } = data;

	return (
		<label id={styles.csv_label} htmlFor="csv_input">
			<div className={styles.upload_card}>
				{icon}
				Upload {text.toUpperCase()} data as CSV file
				<input id="csv_input" type="file" accept=".csv" hidden />
			</div>
		</label>
	);
}
