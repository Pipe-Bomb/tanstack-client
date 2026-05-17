import { defineConfig } from "orval";

export default defineConfig({
	pipebomb: {
		input: "./spec.json",
		output: {
			target: "./src/api",
			schemas: "./src/api/model",
			client: "react-query",
			formatter: "prettier",
			mode: "split",
			clean: true,
			override: {
				useDates: true,
				mutator: {
					path: "./src/api-client.ts",
					name: "customFetch",
				},
			},
			indexFiles: true,
		},
	},
});
