import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path"
import * as fs from "fs"
import module from "module";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), reactVirtualized()],
})

const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;
export function reactVirtualized() {
  return {
    name: "my:react-virtualized",
    configResolved() {
      const require = module.createRequire(import.meta.url);
      const file = require
        .resolve("react-virtualized")
        .replace(
          path.join("dist", "commonjs", "index.js"),
          path.join("dist", "es", "WindowScroller", "utils", "onScroll.js"),
        );
      const code = fs.readFileSync(file, "utf-8");
      const modified = code.replace(WRONG_CODE, "");
      fs.writeFileSync(file, modified);
    },
  }
}
