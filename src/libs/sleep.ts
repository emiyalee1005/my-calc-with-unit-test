export default function sleep(d?: number) {
  return new Promise((r) => setTimeout(r, d));
}
