import Navbar from "../components/header/Navbar";

const withLayout = (Component) =>
	function Layout(props) {
		return (
			<>
				<Navbar />
				<main>
					<Component {...props} />
				</main>
			</>
		);
	};

export default withLayout;

