/**
 * Renders **marked** words in the serif's italic — how Arrae emphasises
 * inside a heading ("Trusted by *Millions of Women Worldwide*"). The
 * serif has one weight, so emphasis is never bold.
 */
export function Emphasised({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>,
      )}
    </>
  );
}
