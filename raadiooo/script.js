const dial = document.getElementById("dial");
const now = document.getElementById("now");
dial.addEventListener("click", () => {
  const on = dial.classList.toggle("is-on");
  dial.setAttribute("aria-pressed", on ? "true" : "false");
  now.textContent = on ? "carrier · no stream yet" : "off air";
});
