export function requestNotifPermission(onConfirm) {
  if (!('Notification' in window)) return;
  if (localStorage.getItem('sk_notif_asked')) return;
  Notification.requestPermission().then(permission => {
    // Only mark as "asked" once the user actually decided (granted/denied). A dismissed prompt
    // returns 'default' — leave the flag unset so we can offer the reminder again later.
    if (permission !== 'default') localStorage.setItem('sk_notif_asked', 'true');
    const granted = permission === 'granted';
    localStorage.setItem('sk_notif_granted', granted ? 'true' : 'false');
    if (granted && onConfirm) onConfirm();
  });
}

export function maybeShowStreakReminder(streak) {
  if (localStorage.getItem('sk_notif_granted') !== 'true') return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const today = new Date().toDateString();
  if (localStorage.getItem('sk_notif_shown_date') === today) return;
  if (new Date().getHours() < 18) return;
  // Only consume today's "shown" slot if the notification actually fired.
  try {
    new Notification('SANSKRIT.EXE', {
      body: `Streak: ${streak}×. Complete a lesson before midnight.`,
      icon: '/favicon.png'
    });
    localStorage.setItem('sk_notif_shown_date', today);
  } catch {}
}
