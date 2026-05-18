export function requestNotifPermission(onConfirm) {
  if (!('Notification' in window)) return;
  if (localStorage.getItem('sk_notif_asked')) return;
  localStorage.setItem('sk_notif_asked', 'true');
  Notification.requestPermission().then(permission => {
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
  localStorage.setItem('sk_notif_shown_date', today);
  new Notification('SANSKRIT.EXE', {
    body: `Streak: ${streak}×. Complete a lesson before midnight.`,
    icon: '/favicon.png'
  });
}
