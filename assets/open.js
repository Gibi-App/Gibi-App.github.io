(function () {
  var params = new URLSearchParams(window.location.search);
  var otp = (params.get('otp') || '').replace(/\D/g, '');
  var type = params.get('type');

  if (!otp) {
    document.getElementById('no-code').hidden = false;
    return;
  }

  document.getElementById('with-code').hidden = false;
  document.getElementById('code').textContent = otp;
  if (type === 'recovery') {
    document.getElementById('title').textContent = 'كود تغيير كلمة السر';
    document.getElementById('hint').textContent = 'اكتب الكود ده في جيبي، واختار كلمة سر جديدة.';
  } else {
    document.getElementById('title').textContent = 'كود تأكيد حسابك';
    document.getElementById('hint').textContent = 'اكتب الكود ده في جيبي عشان تأكد حسابك.';
  }

  // Opens the Gibi app on Android if it is installed (same address, so the
  // app picks up the code by itself).
  var openApp = document.getElementById('open-app');
  var isAndroid = /Android/i.test(navigator.userAgent);
  if (isAndroid) {
    openApp.href = 'intent://' + window.location.host + window.location.pathname +
      window.location.search + '#Intent;scheme=https;package=com.gibi.gibi;end';
  } else {
    openApp.hidden = true;
  }

  var copyButton = document.getElementById('copy');
  copyButton.addEventListener('click', function () {
    var done = function () {
      copyButton.textContent = 'اتنسخ ✓';
      setTimeout(function () { copyButton.textContent = 'انسخ الكود'; }, 2000);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(otp).then(done);
    } else {
      var range = document.createRange();
      range.selectNodeContents(document.getElementById('code'));
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      done();
    }
  });
})();
