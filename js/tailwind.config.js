content: ["./*.html", "./js/**/*.js", "./components/**/*.php"]

module.exports = {
    content: ["./*.html", "./components/**/*.html"],
    theme: {
      extend: {
        colors: {
          primary: "#ffbe00", // Sarı vurgu
          dark: "#0f0f0f",    // Siyah ton
          light: "#ffffff",   
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
        },
      },
    },
    plugins: [],
  };