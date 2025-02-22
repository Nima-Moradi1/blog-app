import LocalFont from "next/font/local";

const vazirFont = LocalFont({
  src: [
    {
      path: "../../public/fonts/vazir/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazir/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazir/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazir/Vazirmatn-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazir/Vazirmatn-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  // we use variable for better tailwind and css config
  variable: "--font-vazir",
  style: "normal",
  // block : until the font is not loaded , no other font should be loaded
  display: "block",
});

export default vazirFont;
