document.querySelectorAll(".years-since").forEach((el) => {
  el.textContent = new Date().getFullYear() - Number(el.dataset.since);
});
