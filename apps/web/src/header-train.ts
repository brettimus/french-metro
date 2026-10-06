// The header line badges sit on one scrollable rail. Every few seconds a
// small train leaves its stop, speeds up, slows down and stops at the next
// line, and the rail scrolls with it when the badges do not all fit.
const DWELL = 7000;
const FIRST_DEPARTURE = 3500;
const TRAVEL = 1500;
const RESUME_AFTER_INTERACTION = 12000;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

let stopCurrent: (() => void) | undefined;

export function startHeaderTrain(nav: HTMLElement) {
  stopCurrent?.();
  const found = nav.querySelector<HTMLElement>(".train");
  const stops = [...nav.querySelectorAll<HTMLAnchorElement>(".line-rail a")];
  if (!found || stops.length < 2) return;
  const train: HTMLElement = found;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const current = stops.findIndex((a) => a.hasAttribute("aria-current"));
  let index = Math.max(current, 0);
  let timer: number | undefined;
  let frame: number | undefined;
  let pausedUntil = 0;
  let hovered = false;
  let stopped = false;

  const centre = (a: HTMLElement) => a.offsetLeft + a.offsetWidth / 2;
  const overflowing = () => nav.scrollWidth > nav.clientWidth + 1;
  const scrollTargetFor = (a: HTMLElement) =>
    Math.max(
      0,
      Math.min(nav.scrollWidth - nav.clientWidth, centre(a) - nav.clientWidth / 2),
    );
  const updateFades = () => {
    nav.classList.toggle("fade-start", nav.scrollLeft > 2);
    nav.classList.toggle(
      "fade-end",
      nav.scrollLeft < nav.scrollWidth - nav.clientWidth - 2,
    );
  };
  const placeTrain = (a: HTMLElement) => {
    train.style.setProperty("--train-x", `${centre(a)}px`);
    train.style.setProperty("--train-color", a.style.getPropertyValue("--nav-line"));
    stops.forEach((s) => s.classList.toggle("has-train", s === a));
  };

  const busy = () =>
    stopped ||
    hovered ||
    document.hidden ||
    reduced.matches ||
    Date.now() < pausedUntil ||
    nav.matches(":focus-within") ||
    !nav.isConnected;

  const schedule = (delay: number) => {
    clearTimeout(timer);
    timer = window.setTimeout(depart, delay);
  };

  function depart() {
    if (!nav.isConnected) return stop();
    if (busy()) return schedule(DWELL / 2);
    const from = stops[index]!;
    index = (index + 1) % stops.length;
    const to = stops[index]!;
    const x0 = centre(from);
    const x1 = centre(to);
    const s0 = nav.scrollLeft;
    const s1 = overflowing() ? scrollTargetFor(to) : s0;
    const color = to.style.getPropertyValue("--nav-line");
    from.classList.remove("has-train");
    train.classList.add("moving");
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / TRAVEL);
      const e = easeInOut(t);
      // The train stretches at top speed and settles back when it stops.
      const stretch = 1 + 0.9 * Math.sin(Math.PI * e);
      train.style.setProperty("--train-x", `${x0 + (x1 - x0) * e}px`);
      train.style.setProperty("--train-stretch", String(stretch));
      if (s1 !== s0) nav.scrollLeft = s0 + (s1 - s0) * e;
      if (t > 0.5) train.style.setProperty("--train-color", color);
      if (t < 1) frame = requestAnimationFrame(step);
      else {
        train.classList.remove("moving");
        train.style.setProperty("--train-stretch", "1");
        placeTrain(to);
        schedule(DWELL);
      }
    };
    frame = requestAnimationFrame(step);
  }

  // A person who scrolls or touches the rail takes over until they stop.
  const interrupt = () => {
    pausedUntil = Date.now() + RESUME_AFTER_INTERACTION;
    if (frame !== undefined && train.classList.contains("moving")) {
      cancelAnimationFrame(frame);
      frame = undefined;
      train.classList.remove("moving");
      train.style.setProperty("--train-stretch", "1");
      // Go back to the stop the train left, which is still near the view.
      index = (index - 1 + stops.length) % stops.length;
      placeTrain(stops[index]!);
      schedule(RESUME_AFTER_INTERACTION);
    }
  };
  // A vertical mouse wheel scrolls the rail sideways until the rail ends.
  const wheel = (e: WheelEvent) => {
    interrupt();
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || !overflowing()) return;
    const max = nav.scrollWidth - nav.clientWidth;
    if ((e.deltaY < 0 && nav.scrollLeft <= 0) || (e.deltaY > 0 && nav.scrollLeft >= max - 1))
      return;
    e.preventDefault();
    nav.scrollLeft += e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
  };
  const enter = () => (hovered = true);
  const leave = () => (hovered = false);
  const resize = () => {
    if (!train.classList.contains("moving")) placeTrain(stops[index]!);
    updateFades();
  };

  nav.addEventListener("scroll", updateFades, { passive: true });
  nav.addEventListener("wheel", wheel, { passive: false });
  nav.addEventListener("pointerdown", interrupt);
  nav.addEventListener("touchstart", interrupt, { passive: true });
  nav.addEventListener("keydown", interrupt);
  nav.addEventListener("pointerenter", enter);
  nav.addEventListener("pointerleave", leave);
  window.addEventListener("resize", resize);

  function stop() {
    stopped = true;
    clearTimeout(timer);
    if (frame !== undefined) cancelAnimationFrame(frame);
    nav.removeEventListener("scroll", updateFades);
    nav.removeEventListener("wheel", wheel);
    nav.removeEventListener("pointerdown", interrupt);
    nav.removeEventListener("touchstart", interrupt);
    nav.removeEventListener("keydown", interrupt);
    nav.removeEventListener("pointerenter", enter);
    nav.removeEventListener("pointerleave", leave);
    window.removeEventListener("resize", resize);
  }
  stopCurrent = stop;

  // Open on the current line so it is visible on narrow screens.
  if (current >= 0 && overflowing()) nav.scrollLeft = scrollTargetFor(stops[current]!);
  placeTrain(stops[index]!);
  updateFades();
  requestAnimationFrame(() => train.classList.add("ready"));
  schedule(FIRST_DEPARTURE);
}
