const CleanCSS = require("clean-css");
const PluginRSS = require("@11ty/eleventy-plugin-rss");
const HTMLMin = require("html-minifier");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = HTMLMin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = HTMLMin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addShortcode("getBaseUrl", function () {
    return "https://sam.bossley.us";
  });
  eleventyConfig.addFilter("slugClean", function (url) {
    return url
      .replace(/\s+/g, "-")
      .replace(/[&,+()$~%.'":*?<>{}]/g, "")
      .toLowerCase();
  });

  eleventyConfig.addFilter("readLength", function (content) {
    return Math.round(content.length / 238 / 2.2);
  });

  eleventyConfig.addFilter("dateFmt", function (inputDate) {
    return new Date(inputDate).toDateString();
  });
  eleventyConfig.addShortcode("getCurrentYear", function () {
    return new Date().getUTCFullYear().toString();
  });

  eleventyConfig.addCollection("thoughts", function (collection) {
    return collection.getFilteredByGlob("thoughts/*.md");
  });
  eleventyConfig.addFilter("sortByDate", function (collection) {
    return collection.sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });
  eleventyConfig.addFilter("filterByTag", function (collection, tag) {
    return collection.filter((item) => item.data.tags.indexOf(tag) >= 0);
  });

  eleventyConfig.addPlugin(PluginRSS);

  eleventyConfig.addPassthroughCopy("./manifest.json");
  eleventyConfig.addPassthroughCopy("./favicon.png");
  eleventyConfig.addPassthroughCopy("./favicon_512x152.png");
  eleventyConfig.addPassthroughCopy("./Sam_Bossley.pdf");
  eleventyConfig.addPassthroughCopy("./public");

  return {
    templateFormats: ["html", "md", "njk", "liquid"],
  };
};
