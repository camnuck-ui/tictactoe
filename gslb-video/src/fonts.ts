import { loadFont } from "@remotion/google-fonts/SchibstedGrotesk";

// Same typeface as the source comparison page
export const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});
