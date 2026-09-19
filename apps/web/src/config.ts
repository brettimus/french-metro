/** Parse the PORT environment variable, falling back to 3000. */
export function parsePort(value: string | undefined): number {
  if (value === undefined || value === '') return 3000;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: ${JSON.stringify(value)}`);
  }
  return port;
}
