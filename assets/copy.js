(function () {
  var otp = (new URLSearchParams(window.location.search).get('otp') || '').replace(/\D/g, '');
  var status = document.getElementById('status');
  var button = document.getElementById('copy');
  document.getElementById('code').textContent = otp || '—';

  if (!otp) {
    status.textContent = 'الرابط ده ناقص';
    document.getElementById('hint').textContent = 'افتح الرابط من الإيميل اللي وصلك من جيبي.';
    button.hidden = true;
    return;
  }

  function copied() {
    status.textContent = 'اتنسخ ✓';
    button.textContent = 'اتنسخ ✓';
  }

  function copy() {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(otp).then(copied);
    }
    var range = document.createRange();
    range.selectNodeContents(document.getElementById('code'));
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    if (document.execCommand('copy')) { copied(); return Promise.resolve(); }
    return Promise.reject();
  }

  // Try right away; some browsers only allow copying after a tap.
  copy().catch(function () {
    status.textContent = 'دوس على الزرار عشان تنسخ';
  });
  button.addEventListener('click', function () { copy().catch(function () {}); });
})();
