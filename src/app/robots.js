export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://architect.example.com/sitemap.xml",
    host: "https://architect.example.com",
  };
}
