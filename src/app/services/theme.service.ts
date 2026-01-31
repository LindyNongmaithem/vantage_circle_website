import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'darkMode';
  private isDarkModeSubject = new BehaviorSubject<boolean>(this.loadThemePreference());
  public isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor() {
    this.applyTheme(this.isDarkModeSubject.value);
  }

  private loadThemePreference(): boolean {
    const savedMode = localStorage.getItem(this.THEME_KEY);
    return savedMode === 'true';
  }

  toggleTheme(): void {
    const newMode = !this.isDarkModeSubject.value;
    this.setTheme(newMode);
  }

  setTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, isDark.toString());
    this.isDarkModeSubject.next(isDark);
    this.applyTheme(isDark);
  }

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
