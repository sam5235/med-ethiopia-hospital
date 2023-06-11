/** @type {import('next').NextConfig} */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/tinymce"),
            to: path.join(__dirname, "public/tinymce"),
          },
        ],
      })
    );
    return config;
  },
};

module.exports = nextConfig;
