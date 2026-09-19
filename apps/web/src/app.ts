/** Update the #health line with the deployed commit from /healthz. */
async function checkHealth(): Promise<void> {
  const el = document.getElementById('health');
  if (!el) return;
  try {
    const res = await fetch('/healthz');
    const data = (await res.json()) as { status: string; commit: string };
    el.textContent = `status: ${data.status} \u00b7 commit: ${data.commit.slice(0, 7)}`;
  } catch {
    el.textContent = 'health check failed';
  }
}

void checkHealth();
