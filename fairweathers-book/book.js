(function () {
  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var stage = document.getElementById('stage');
  var pos = document.getElementById('pos');
  var i = 0;

  function fit() {
    var s = Math.min(window.innerWidth / 1920, (window.innerHeight - 56) / 1080);
    stage.style.transform = 'scale(' + s + ')';
    stage.style.marginLeft = (-960 * s) + 'px';
    stage.style.marginTop = (-540 * s - 24) + 'px';
    stage.style.left = '50%';
    stage.style.top = '50%';
  }
  function show(n) {
    i = Math.max(0, Math.min(pages.length - 1, n));
    pages.forEach(function (p, k) { p.classList.toggle('active', k === i); });
    pos.textContent = (i + 1) + ' / ' + pages.length;
    try { history.replaceState(null, '', '#' + (i + 1)); } catch (e) {}
  }
  document.getElementById('prev').onclick = function () { show(i - 1); };
  document.getElementById('next').onclick = function () { show(i + 1); };
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ') show(i + 1);
    if (e.key === 'ArrowLeft') show(i - 1);
  });
  window.addEventListener('resize', fit);
  fit();
  show((parseInt((location.hash || '#1').slice(1), 10) || 1) - 1);
})();
