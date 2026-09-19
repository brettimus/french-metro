async function checkHealth() {
  const el = document.getElementById('health');
  if (!el) return;
  try {
    const res = await fetch('/healthz');
    const data = await res.json();
    el.textContent = 'status: ' + data.status + ' \u00b7 commit: ' + data.commit.slice(0, 7);
  } catch {
    el.textContent = 'health check failed';
  }
}

void checkHealth();
