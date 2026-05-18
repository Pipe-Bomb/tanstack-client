import { exec, execSync } from "child_process";
import * as FS from "fs";

const specPath = process.argv[2];
if (!specPath) {
	console.error("Spec path not specified.");
	console.error("Usage:\n  >  npm run dev -- /path/to/spec.json");
	process.exit(1);
}

console.log(`Watching spec file: "${specPath}"`);

if (!FS.existsSync(specPath)) {
	console.error("Spec file doesn't exist!");
	process.exit(1);
}

function build() {
	try {
		console.log("Generating...");
		const start = Date.now();
		execSync(`npm run generate -- -i ${specPath}`);
		console.log("Building...");
		execSync("npm run build -- --outDir dist-tmp");

		if (FS.existsSync("dist")) {
			FS.renameSync("dist", "dist-old");
		}
		FS.renameSync("dist-tmp", "dist");

		if (FS.existsSync("dist-old")) {
			FS.rmSync("dist-old", { recursive: true, force: true });
		}

		console.log(`Library updated in ${(Date.now() - start) / 1000}s`);
	} catch (e) {
		console.error(e);
	}
}

FS.watchFile(specPath, () => {
	console.log("Spec file updated!");
	build();
});

build();
