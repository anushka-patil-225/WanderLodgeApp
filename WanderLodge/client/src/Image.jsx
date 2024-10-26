export default function Image({ src, ...rest }) {
  src = src && src.includes("https://") ? src : "https://localhost:4000/" + src;
  return <img {...rest} src={src} alt={""} />;
}
