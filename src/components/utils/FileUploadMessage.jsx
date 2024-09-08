import styles from "../../styles/utils/FileUploadMessage.module.css";

export default function FileUploadMessage({ fileTypeName }) {
	return (
		<h3 className={styles.file_upload_message}>
			<span className={styles.file_type_name}>
				{fileTypeName.toUpperCase()}
			</span>{" "}
			data is uploaded successfully
		</h3>
	);
}
