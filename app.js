/* PWA, language, reminders. Loaded after the main app. */
var LANG = 'he';
try { if (localStorage.getItem('lang') === 'en') LANG = 'en'; } catch (e) {}
document.documentElement.lang = LANG === 'en' ? 'en' : 'he';
document.documentElement.dir = LANG === 'en' ? 'ltr' : 'rtl';

function ui(he, en) { return LANG === 'en' ? en : he; }
function toggleLang() { setLang(LANG === 'en' ? 'he' : 'en'); }
function isIOS() {
  var ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}
function isStandalone() {
  return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
}
function todayStr() {
  var t = new Date();
  return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
}

var TR = [
  ['📲 התקן בטלפון', '📲 Install on phone'],
  ['🔔 תזכורות', '🔔 Reminders'],
  ['🔔 בקש הרשאה להתראות', '🔔 Allow notifications'],
  ['📅 תזכורת לאירוע', '📅 Event reminder'],
  ['✏️ תזכורת שלי', '✏️ My reminder'],
  ['🏷️ תזכורת לבדוק את המחיר', '🏷️ reminder to check the price'],
  ['תזכורת לבדוק את המחיר', 'reminder to check the price'],
  ['➕ הוסף תזכורת מחיר', '➕ Add price reminder'],
  ['➕ הוסף תזכורת', '➕ Add reminder'],
  ['➕ הוסף אירוע', '➕ Add event'],
  ['הרשימה שלי', 'My list'],
  ['אין תזכורות', 'No reminders yet'],
  ['נשמר רק במכשיר הזה. כשהאפליקציה נפתחת ביום שבחרת, התזכורת מופיעה כאן.', 'Saved only on this device. When the app opens on the day you picked, the reminder shows up here.'],
  ['בדוק שהתאריך לא חל בשבת או בחג — האפליקציה לא בודקת את זה לבד', 'Check that the date is not on Shabbat or a holiday — the app does not check this for you'],
  ['בדקו שזה לא בשבת או בחג', 'check it is not on Shabbat or a holiday'],
  ['זו רק תזכורת לבדוק את המחיר. אין כאן מעקב מחירים אוטומטי.', 'This is only a reminder to check the price. There is no automatic price monitoring.'],
  ['מה האירוע? למשל: יום הולדת', "What's the event? e.g. a birthday"],
  ['מה להזכיר?', 'What should we remind?'],
  ['שם המוצר', 'Product name'],
  ['מחיר לבדיקה (₪)', 'Price to check (₪)'],
  ['🤖 סמסונג ואנדרואיד — Chrome ו-Samsung Internet', '🤖 Samsung and Android — Chrome and Samsung Internet'],
  ['לחצו על 📲 התקן בטלפון. הדפדפן יפתח חלון התקנה — אשרו אותו. אם אין חלון: בכרום לחצו ⋮ ואז Install app או Add to Home screen. ב-Samsung Internet: תפריט ← Add page to ← Home screen.', 'Tap 📲 Install on phone. The browser opens an install prompt — confirm it. If there is no prompt: in Chrome tap ⋮ then Install app or Add to Home screen. In Samsung Internet: menu → Add page to → Home screen.'],
  ['🍏 אייפון — Safari', '🍏 iPhone — Safari'],
  ['1. לחצו על כפתור השיתוף Share (הריבוע עם החץ למעלה).', '1. Tap the Share button (the square with an arrow).'],
  ['2. גללו ובחרו Add to Home Screen / הוסף למסך הבית.', '2. Scroll and tap Add to Home Screen.'],
  ['3. לחצו Add / הוסף.', '3. Tap Add.'],
  ['💡 מבקשים מההורים לעזור בהתקנה', '💡 Ask a parent to help with installing'],
  ['האפליקציה נשארת כשרה וצנועה גם אחרי ההתקנה.', 'The app stays kosher and modest after it is installed.'],
  ['🛒 רשימת הקניות שלי', '🛒 My shopping list'],
  ['שלח את הרשימה להורים לאישור. אין כאן תשלום — רק רשימה.', 'Send the list to a parent for approval. There is no payment here — it is only a list.'],
  ['הרשימה ריקה — לחץ 🛒 או 🎁 על כל כרטיס כדי להוסיף', 'The list is empty — tap 🛒 or 🎁 on a card to add something'],
  ['או כתוב משהו להוספה...', 'Or type something to add...'],
  ['🧮 סה״כ:', '🧮 Total:'],
  [' פריטים (', ' items ('],
  ['מוצרים שונים)', 'different products)'],
  ['🎁 רשימת משאלות ליום הולדת', '🎁 Birthday wishlist'],
  ['שתף עם המשפחה מה היית שמח לקבל 🎂', 'Share with your family what you would like to get 🎂'],
  ['📤 שתף', '📤 Share'],
  ['📋 העתק', '📋 Copy'],
  ['🧹 נקה', '🧹 Clear'],
  ['aria-label="פחות"', 'aria-label="Less"'],
  ['aria-label="עוד"', 'aria-label="More"'],
  ['title="שמור למועדפים"', 'title="Save to favorites"'],
  ['title="הוסף לרשימת קניות"', 'title="Add to shopping list"'],
  ['title="הוסף לרשימת משאלות"', 'title="Add to wishlist"'],
  ['title="השווה"', 'title="Compare"'],
  ['פחות', 'Less'],
  ['עוד', 'More'],
  ['שמור למועדפים', 'Save to favorites'],
  ['הוסף לרשימת קניות', 'Add to shopping list'],
  ['הוסף לרשימת משאלות', 'Add to wishlist'],
  ['השווה', 'Compare'],
  ['כתוב כתובת או מקום', 'Type an address or place'],
  ['🍽️ מסעדות כשרות', '🍽️ Kosher restaurants'],
  ['🥙 דוכנים', '🥙 Food stands'],
  ['🏫 בית ספר', '🏫 School'],
  ['📚 ספרייה', '📚 Library'],
  ['🗺️ כתוב מקום והמפה תופיע כאן', '🗺️ Type a place and the map will show here'],
  ['נווט בוויז', 'Navigate in Waze'],
  ['צפה', 'Look'],
  ['📱 סרקו עם המצלמה', '📱 Scan with your camera'],
  ['✕ סגור', '✕ Close'],
  ['⭐ מועדפים', '⭐ Favorites'],
  ['🕘 היסטוריה', '🕘 History'],
  ['נקה היסטוריה', 'Clear history'],
  ['עדיין אין', 'Nothing yet'],
  ['ריק', 'Empty'],
  ['❤️ המועדפים שלי', '❤️ My favorites'],
  ['🕘 חיפשת לאחרונה', '🕘 Recent searches'],
  ['🗑️ נקה', '🗑️ Clear'],
  ['ℹ️ קישורי חנויות נפתחים באותו חלון — לחזרה לחץ "חזור" בדפדפן ↩️', 'ℹ️ Shop links open in this same window — use the browser Back button to return ↩️'],
  ['🙏 את זה לא נציג כאן', '🙏 We will not show that here'],
  ['🙏 את זה לא נציג', '🙏 We will not show that'],
  ['לא מתאים לאפליקציה כשרה וצנועה. נסה משהו אחר 😊', 'does not fit a kosher and modest app. Try something else 😊'],
  ['✡️ מומלץ לבדוק תעודת כשרות / הכשר על המוצר', '✡️ Check the kosher certificate on the product'],
  ['✡️ מומלץ לבדוק תעודת כשרות במקום', '✡️ Check the kosher certificate at the place'],
  ['🕯️ לפני הקנייה כדאי לוודא שהאירוע לא בשבת או בחג', '🕯️ Before buying, make sure the event is not on Shabbat or a holiday'],
  ['התאריכים והמחירים מופיעים באתרי הכרטיסים עצמם · 🕯️ כדאי לוודא שהאירוע לא בשבת או בחג', 'Dates and prices are on the ticket sites · 🕯️ Make sure the event is not on Shabbat or a holiday'],
  ['🛡️ רק בחנויות הרשמיות · המשחק עצמו בחינם, קניות בתוך המשחק — רק באישור ההורים', '🛡️ Official stores only · the game is free, and in-game purchases need a parent’s OK'],
  ['מסעדה כשרה קרובה', 'a nearby kosher restaurant'],
  ['נווט לחנות / למקום', 'navigate to a shop or place'],
  ['מבט רחוב', 'street view'],
  ['📡 אין אינטרנט — המפה תופיע כשיהיה חיבור', '📡 You are offline — the map will show when you are back online'],
  ['🔎 מחפש את המקום…', '🔎 Looking up the place…'],
  ['📡 לא הצלחתי לחפש עכשיו — נסה שוב עוד רגע', '📡 Could not search just now — try again in a moment'],
  ['מקומות אוכל כשרים', 'kosher food places'],
  ['לפני שאוכלים — בודקים תעודת כשרות בתוקף במקום', 'Before you eat — check a valid kosher certificate at the place'],
  ['אם המקום לא נכון — נסה להוסיף את שם העיר', 'If the place is wrong — try adding the city name'],
  ['🧰 כלים', '🧰 Tools'],
  ['צפה', 'Look'],
  ['מפה', 'Map'],
  ['תקציב חודשי', 'Monthly budget'],
  ['לקנות שוב', 'Buy again'],
  ['מדריך קניונים', 'Mall guide'],
  ['מה ללבוש', 'What to wear'],
  ['ארוחה משפחתית', 'Family meal'],
  ['מחולל מתנות', 'Gift ideas'],
  ['לוח חגים', 'Holiday calendar'],
  ['אתגר חיסכון', 'Savings challenge'],
  ['תזכורות', 'Reminders'],
  ['מבצעים', 'Deals'],
  ['מתנה לפי גיל', 'Gift by age'],
  ['מתנה למי?', 'Gift for whom?'],
  ['סקווישי השבוע', 'Squishy of the week'],
  ['מעקב חבילה', 'Track a parcel'],
  ['חנויות קרובות', 'Nearby shops'],
  ['רשימת סופר', 'Grocery list'],
  ['רשימה לבית ספר', 'School list'],
  ['רשימה לטיול', 'Trip list'],
  ['רשימה למסיבה', 'Party list'],
  ['מחשבון חיסכון', 'Savings calculator'],
  ['היסטוריית חיפוש', 'Search history'],
  ['הערות למועדפים', 'Notes on favorites'],
  ['הפתע אותי', 'Surprise me'],
  ['ספירה לאחור', 'Countdown'],
  ['התגים שלי', 'My badges'],
  ['טקסט גדול', 'Big text'],
  ['התקנה בטלפון', 'Install on phone'],
  ['→ חזרה לכלים', '→ Back to tools'],
  ['✨ הצעה', '✨ Idea'],
  ['💰 ראה מחירים אמיתיים', '💰 See real prices']
];
TR.sort(function (a, b) { return b[0].length - a[0].length; });

function mapText(t) {
  var i, a, b, o = t;
  for (i = 0; i < TR.length; i++) if (o === TR[i][0]) return TR[i][1];
  for (i = 0; i < TR.length; i++) {
    a = TR[i][0]; b = TR[i][1];
    if (a.length >= 16 && o.indexOf(a) >= 0) o = o.split(a).join(b);
  }
  return o;
}
function tr(h) {
  if (LANG !== 'en' || !h) return h;
  var saved = [];
  h = String(h).replace(/<span class="ut">[\s\S]*?<\/span>/g, function (m) {
    saved.push(m); return '\u0001' + (saved.length - 1) + '\u0001';
  });
  h = mapText(h);
  return h.replace(/\u0001(\d+)\u0001/g, function (_, i) { return saved[+i]; });
}
function localizeRoot(root) {
  if (LANG !== 'en' || !root) return;
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  var nodes = [], n;
  while ((n = walker.nextNode())) nodes.push(n);
  nodes.forEach(function (node) {
    if (node.parentElement && node.parentElement.closest && node.parentElement.closest('.ut')) return;
    var next = mapText(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  });
  root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(function (el) {
    ['placeholder', 'aria-label', 'title'].forEach(function (attr) {
      var v = el.getAttribute(attr);
      if (!v) return;
      var next = mapText(v);
      if (next !== v) el.setAttribute(attr, next);
    });
  });
}

var modalHTML = '';
var modalRefresh = null;
if (typeof tmodal === 'function') {
  var _tmodal = tmodal;
  tmodal = function (h) {
    modalHTML = h;
    _tmodal(tr(h));
    localizeRoot($('tools'));
    if (modalRefresh) modalRefresh();
  };
}
if (typeof qtyHtml === 'function') {
  var _qtyHtml = qtyHtml;
  qtyHtml = function (n, inl) { return tr(_qtyHtml(n, inl)); };
}
if (typeof typeCard === 'function') {
  var _typeCard = typeCard;
  typeCard = function () { return tr(_typeCard.apply(this, arguments)); };
}
if (typeof openQR === 'function') {
  var _openQR = openQR;
  openQR = function () { var r = _openQR.apply(this, arguments); localizeRoot($('qrFull')); return r; };
}
if (typeof wazeModal === 'function') {
  var _wazeModal = wazeModal;
  wazeModal = function () { modalRefresh = null; return _wazeModal.apply(this, arguments); };
}
if (typeof wzPrev === 'function') {
  var _wzPrev = wzPrev;
  wzPrev = async function () {
    var r = await _wzPrev.apply(this, arguments);
    localizeRoot($('wzList')); localizeRoot($('wzMap'));
    return r;
  };
}
if (typeof openCart === 'function') {
  var _openCart = openCart;
  openCart = function () { modalRefresh = null; return _openCart.apply(this, arguments); };
}
if (typeof openWish === 'function') {
  var _openWish = openWish;
  openWish = function () { modalRefresh = null; return _openWish.apply(this, arguments); };
}
if (typeof search === 'function') {
  var _search = search;
  search = function () {
    var p = _search.apply(this, arguments);
    var done = function () { localizeRoot($('left')); localizeRoot($('right')); };
    if (p && p.then) p.then(done, done); else setTimeout(done, 40);
    return p;
  };
}
if (typeof openCat === 'function') {
  var _openCat = openCat;
  openCat = function () {
    var r = _openCat.apply(this, arguments);
    setTimeout(function () { localizeRoot($('left')); }, 60);
    setTimeout(function () { localizeRoot($('left')); }, 500);
    return r;
  };
}
if (typeof tool2 === 'function') {
  var _tool2 = tool2;
  tool2 = function (b) {
    var t = b && b.dataset && b.dataset.t2;
    if (t === 'rems') return openReminders();
    if (t === 'pwa') return openInstall();
    if (t === 'close') modalRefresh = null;
    return _tool2(b);
  };
}

if (typeof setLang === 'function') {
  var _setLang = setLang;
  setLang = function (l, silent) {
    LANG = l === 'en' ? 'en' : 'he';
    var prev = toast;
    if (silent) toast = function () {};
    try { _setLang(LANG); } catch (e) {}
    toast = prev;
    document.documentElement.lang = LANG === 'en' ? 'en' : 'he';
    document.documentElement.dir = LANG === 'en' ? 'ltr' : 'rtl';
    var lb = $('langBtn'); if (lb) lb.textContent = LANG === 'en' ? '🌐 עברית' : '🌐 English';
    var ib = $('installBtn'); if (ib) ib.textContent = ui('📲 התקן בטלפון', '📲 Install on phone');
    var rb = $('remBtn'); if (rb) rb.textContent = ui('🔔 תזכורות', '🔔 Reminders');
    localizeRoot($('drawer'));
    localizeRoot($('backHint'));
    localizeRoot($('homeRecent'));
    if ($('qrFull')) { try { openQR(); } catch (e) {} }
    if ($('tools') && $('tools').style.display === 'flex' && modalHTML) {
      _tmodal(tr(modalHTML));
      localizeRoot($('tools'));
      if (modalRefresh) modalRefresh();
    }
    renderIos();
    try { homeRecent(); } catch (e) {}
    if ($('main') && $('main').style.display !== 'none' && $('q') && $('q').value) {
      try { search($('q').value); } catch (e) {}
    }
  };
}

function normRems() {
  var R = [];
  try {
    if (typeof OJ === 'function') R = OJ('rems', []);
    else R = JSON.parse(store.get('rems') || '[]');
  } catch (e) { R = []; }
  if (!Array.isArray(R)) R = [];
  return R.map(function (r) {
    return { kind: r.kind || 'custom', d: r.d || '', x: r.x || '', item: r.item || '', price: r.price == null ? '' : String(r.price) };
  });
}
function saveRems(R) {
  try {
    if (typeof SJ === 'function') SJ('rems', R);
    else store.set('rems', JSON.stringify(R));
  } catch (e) {}
  try { homeRecent(); } catch (e2) {}
}
function remText(r) {
  var when = (r.d || '').split('-').reverse().join('.');
  if (r.kind === 'price') return '🔔 ' + ui('תזכורת לבדוק את המחיר', 'reminder to check the price') + ': ' + (r.item || r.x || '') + (r.price ? ' · ' + r.price : '') + (when ? ' (' + when + ')' : '');
  if (r.kind === 'event') return '📅 ' + (r.x || '') + (when ? ' (' + when + ')' : '') + ' — ' + ui('בדקו שזה לא בשבת או בחג', 'check it is not on Shabbat or a holiday');
  return '⏰ ' + (r.x || '') + (when ? ' (' + when + ')' : '');
}
function paintDue() {
  var el = $('homeRecent');
  if (!el) return;
  el.querySelectorAll('.remban').forEach(function (n) { n.remove(); });
  var ds = todayStr();
  var html = normRems().filter(function (r) { return r.d && r.d <= ds; }).map(function (r) {
    return '<div class="remban">' + esc(remText(r)) + '</div>';
  }).join('');
  if (html) el.insertAdjacentHTML('afterbegin', html);
}
if (typeof homeRecent === 'function') {
  var _homeRecent = homeRecent;
  homeRecent = function () { _homeRecent(); try { paintDue(); } catch (e) {} localizeRoot($('homeRecent')); };
}

function paintPerm() {
  var n = $('permNote');
  if (!n) return;
  var p = 'unsupported';
  try { p = ('Notification' in window) ? Notification.permission : 'unsupported'; } catch (e) {}
  var msg = {
    granted: ui('התראות מותרות במכשיר הזה', 'Notifications are allowed on this device'),
    denied: ui('ההתראות חסומות בדפדפן. אפשר לאפשר אותן בהגדרות האתר.', 'Notifications are blocked in the browser. You can allow them in the site settings.'),
    default: ui('עדיין לא אישרתם התראות. לחצו על הכפתור כדי לבקש הרשאה.', 'Notifications are not allowed yet. Tap the button to request permission.'),
    unsupported: ui('הדפדפן הזה לא תומך בהתראות', 'This browser does not support notifications')
  };
  n.textContent = msg[p] || msg.default;
}
function askNotify() {
  if (!('Notification' in window) || !Notification.requestPermission) {
    toast(ui('הדפדפן הזה לא תומך בהתראות', 'This browser does not support notifications'));
    paintPerm();
    return;
  }
  Notification.requestPermission().then(function () { paintPerm(); notifyDue(); }, function () { paintPerm(); });
}
function bindRem() {
  var ask = $('askNotify');
  if (ask) ask.onclick = function (e) { e.preventDefault(); e.stopPropagation(); askNotify(); };
  document.querySelectorAll('[data-remadd]').forEach(function (btn) {
    btn.onclick = function (e) { e.preventDefault(); e.stopPropagation(); addRem(btn.getAttribute('data-remadd')); };
  });
  document.querySelectorAll('[data-remdel]').forEach(function (btn) {
    btn.onclick = function (e) { e.preventDefault(); e.stopPropagation(); delRem(+btn.getAttribute('data-remdel')); };
  });
  paintPerm();
}
function addRem(kind) {
  var R = normRems();
  if (kind === 'event') {
    var d = ($('evD') && $('evD').value) || '', x = ($('evT') && $('evT').value || '').trim();
    if (!d || !x) { toast(ui('בחרו תאריך וכתבו מה האירוע', 'Pick a date and write the event')); return; }
    R.push({ kind: 'event', d: d, x: x.slice(0, 80), item: '', price: '' });
  } else if (kind === 'price') {
    var item = ($('prItem') && $('prItem').value || '').trim();
    var price = ($('prPrice') && $('prPrice').value || '').trim();
    var pd = ($('prD') && $('prD').value) || '';
    if (!item || !price || !pd) { toast(ui('כתבו מוצר, מחיר לבדיקה ותאריך', 'Write a product, a price to check, and a date')); return; }
    R.push({ kind: 'price', d: pd, x: item.slice(0, 60), item: item.slice(0, 60), price: price.slice(0, 20) });
  } else {
    var cd = ($('cuD') && $('cuD').value) || '', cx = ($('cuT') && $('cuT').value || '').trim();
    if (!cd || !cx) { toast(ui('בחרו תאריך וכתבו תזכורת', 'Pick a date and write a reminder')); return; }
    R.push({ kind: 'custom', d: cd, x: cx.slice(0, 80), item: '', price: '' });
  }
  R.sort(function (a, b) { return a.d < b.d ? -1 : 1; });
  saveRems(R);
  openReminders();
}
function delRem(i) {
  var R = normRems();
  R.splice(i, 1);
  saveRems(R);
  openReminders();
}
function openReminders() {
  var R = normRems();
  var rows = R.map(function (r, i) {
    var date = esc((r.d || '').split('-').reverse().join('.'));
    var label = r.kind === 'price'
      ? ('תזכורת לבדוק את המחיר: <span class="ut">' + esc(r.item || r.x) + '</span>' + (r.price ? ' · <span class="ut">' + esc(r.price) + '</span>' : ''))
      : ((r.kind === 'event' ? 'אירוע: ' : '') + '<span class="ut">' + esc(r.x) + '</span>');
    return '<div class="hrow">📌 ' + date + ' — ' + label + ' <button class="chip" type="button" data-remdel="' + i + '">🗑️</button></div>';
  }).join('');
  modalRefresh = bindRem;
  tmodal(
    '<h2>🔔 תזכורות</h2>' +
    '<p class="empty">נשמר רק במכשיר הזה. כשהאפליקציה נפתחת ביום שבחרת, התזכורת מופיעה כאן.</p>' +
    '<div class="tbtns"><button class="btn grad" type="button" id="askNotify">🔔 בקש הרשאה להתראות</button></div>' +
    '<p class="empty" id="permNote"></p>' +
    '<div class="panel" style="margin:10px 0"><h3>📅 תזכורת לאירוע</h3>' +
    '<p class="kosher">בדוק שהתאריך לא חל בשבת או בחג — האפליקציה לא בודקת את זה לבד</p>' +
    '<div class="tbtns"><input id="evD" class="tin" type="date" style="max-width:170px"><input id="evT" class="tin" maxlength="80" placeholder="מה האירוע? למשל: יום הולדת"><button class="btn grad" type="button" data-remadd="event">➕ הוסף אירוע</button></div></div>' +
    '<div class="panel" style="margin:10px 0"><h3>✏️ תזכורת שלי</h3>' +
    '<div class="tbtns"><input id="cuD" class="tin" type="date" style="max-width:170px"><input id="cuT" class="tin" maxlength="80" placeholder="מה להזכיר?"><button class="btn grad" type="button" data-remadd="custom">➕ הוסף תזכורת</button></div></div>' +
    '<div class="panel" style="margin:10px 0"><h3>🏷️ תזכורת לבדוק את המחיר</h3>' +
    '<p class="kosher">זו רק תזכורת לבדוק את המחיר. אין כאן מעקב מחירים אוטומטי.</p>' +
    '<div class="tbtns"><input id="prItem" class="tin" maxlength="60" placeholder="שם המוצר"><input id="prPrice" class="tin" maxlength="20" placeholder="מחיר לבדיקה (₪)"><input id="prD" class="tin" type="date" style="max-width:170px"><button class="btn grad" type="button" data-remadd="price">➕ הוסף תזכורת מחיר</button></div></div>' +
    '<h3>הרשימה שלי</h3>' +
    (rows || '<p class="empty">אין תזכורות</p>')
  );
}

function notifyDue() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  var ds = todayStr();
  var seen = {};
  try { seen = JSON.parse(store.get('remSeen') || '{}') || {}; } catch (e) { seen = {}; }
  normRems().filter(function (r) { return r.d && r.d <= ds; }).forEach(function (r) {
    var key = [r.kind, r.d, r.x, r.item, r.price].join('|') + '@' + ds;
    if (seen[key]) return;
    seen[key] = 1;
    var title = r.kind === 'price' ? ui('תזכורת לבדוק את המחיר', 'reminder to check the price') : ui('תזכורת', 'Reminder');
    try { new Notification(title, { body: remText(r), icon: 'icon-192.png' }); } catch (e) {}
  });
  try { store.set('remSeen', JSON.stringify(seen)); } catch (e) {}
}

var bipEvent = null;
window.addEventListener('beforeinstallprompt', function (e) {
  if (e && e.preventDefault) e.preventDefault();
  bipEvent = e;
  var b = $('installBtn');
  if (b) b.classList.add('can-install');
});
window.addEventListener('appinstalled', function () {
  bipEvent = null;
  try { toast(ui('הותקן בהצלחה', 'Installed')); } catch (e) {}
});
function openInstall() {
  modalRefresh = function () {
    var b = $('doInstall');
    if (b) b.onclick = function (ev) { ev.preventDefault(); ev.stopPropagation(); installApp(); };
  };
  tmodal(
    '<h2>📲 התקן בטלפון</h2>' +
    '<p class="empty">האפליקציה נשארת כשרה וצנועה גם אחרי ההתקנה.</p>' +
    '<div class="pwa"><p><b>🤖 סמסונג ואנדרואיד — Chrome ו-Samsung Internet</b><br>לחצו על 📲 התקן בטלפון. הדפדפן יפתח חלון התקנה — אשרו אותו. אם אין חלון: בכרום לחצו ⋮ ואז Install app או Add to Home screen. ב-Samsung Internet: תפריט ← Add page to ← Home screen.</p>' +
    '<p><b>🍏 אייפון — Safari</b><br>1. לחצו על כפתור השיתוף Share (הריבוע עם החץ למעלה).<br>2. גללו ובחרו Add to Home Screen / הוסף למסך הבית.<br>3. לחצו Add / הוסף.</p></div>' +
    '<p class="kosher">💡 מבקשים מההורים לעזור בהתקנה</p>' +
    '<div class="tbtns"><button class="btn grad" type="button" id="doInstall">📲 התקן בטלפון</button></div>'
  );
}
function installApp() {
  if (isStandalone()) { toast(ui('האפליקציה כבר על מסך הבית', 'The app is already on your home screen')); return; }
  if (bipEvent && typeof bipEvent.prompt === 'function') {
    var ev = bipEvent; bipEvent = null;
    try {
      var choice = ev.prompt();
      Promise.resolve(ev.userChoice || choice).then(function (c) {
        if (c && c.outcome === 'accepted') toast(ui('הותקן בהצלחה', 'Installed'));
      }).catch(function () {});
    } catch (e) { openInstall(); }
    return;
  }
  if (!$('doInstall')) openInstall();
}
function renderIos() {
  var el = $('iosHint');
  if (!el) return;
  if (!(isIOS() && !isStandalone())) { el.hidden = true; el.style.display = 'none'; return; }
  el.hidden = false;
  el.style.display = 'block';
  el.innerHTML = LANG === 'en'
    ? '<b>📲 Install on iPhone (Safari)</b><ol><li>Tap the <b>Share</b> button (the square with an arrow).</li><li>Scroll and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>.</li></ol>'
    : '<b>📲 התקנה באייפון (Safari)</b><ol><li>לחצו על כפתור השיתוף <b>Share</b> (הריבוע עם החץ למעלה).</li><li>גללו ובחרו <b>Add to Home Screen</b> / הוסף למסך הבית.</li><li>לחצו <b>Add</b> / הוסף.</li></ol>';
}

document.documentElement.dataset.sw = 'skip';
if (location.protocol === 'https:' && 'serviceWorker' in navigator) {
  document.documentElement.dataset.sw = 'reg';
  navigator.serviceWorker.register('./sw.js').then(function () {
    document.documentElement.dataset.sw = 'on';
  }).catch(function () { document.documentElement.dataset.sw = 'err'; });
}

try { renderIos(); } catch (e) {}
try { if (typeof setLang === 'function') setLang(LANG, true); } catch (e) {}
try { notifyDue(); } catch (e) {}
try { homeRecent(); } catch (e) {}
