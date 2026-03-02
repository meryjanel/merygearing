export const stringToHash = async (s: string) => {
  const encoder = new TextEncoder();
  const encodeingData: Uint8Array = encoder.encode(s);
  const hashBuffer = await window.crypto.subtle.digest(
    "SHA-256",
    encodeingData as BufferSource,
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hash;
};
