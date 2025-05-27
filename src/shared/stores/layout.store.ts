import { signal } from '@angular/core';

export const isSidebarOpen = signal(true);

export function toggleSidebar() {
  isSidebarOpen.update((value) => !value);
}
