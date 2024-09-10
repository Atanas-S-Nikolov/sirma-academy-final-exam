import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { RouterProvider } from "react-router";

import store from "./lib/store/globalStore.js";
import { appRouter } from "./lib/router/AppRouter.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistStore(store)}>
				<RouterProvider router={appRouter}></RouterProvider>
			</PersistGate>
		</Provider>
	</StrictMode>,
);
