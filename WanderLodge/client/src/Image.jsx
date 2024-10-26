export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "https://wanderlodgeapp.onrender.com" + src;
  return <img {...rest} src={src} alt={""} />;
}
