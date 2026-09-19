async function checkHealth(): Promise<void> {
  const el = document.getElementById('health');
  if (!el) return;
  try {
    const res = await fetch('/healthz');
    const data = (await res.json()) as { status: string; commit: string };
    el.textContent = `status: ${data.status} · commit: ${data.commit}`;
  } catch {
    el.textContent = 'health check failed';
  }
}

void checkHealth();
