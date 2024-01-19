import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dns from "dns";
import path from "path";

// https://vitejs.dev/config/

const commonConfig = {
  plugins: [react()],
  server: {
    host: "localhost",
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    extensions: ["", ".js", ".jsx", ".tsx"],
  },
};
dns.setDefaultResultOrder("verbatim");
export default defineConfig(commonConfig);
