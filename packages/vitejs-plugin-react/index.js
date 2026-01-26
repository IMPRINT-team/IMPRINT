export default function reactStub() {
  return {
    name: "react-stub",
    config() {
      return {
        esbuild: {
          jsx: "automatic"
        }
      };
    }
  };
}
