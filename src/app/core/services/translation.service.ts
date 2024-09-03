import { Injectable, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";


@Injectable({
    providedIn: 'root'
})
export class TranslationService {

    currentLang = signal<string>('')
    constructor(private translate: TranslateService) { }
    

    GetLanguage()
    { 
        const savedLang = localStorage.getItem('language') || 'en';
        this.currentLang.set(savedLang )    
        this.translate.use(savedLang);
    }

    // Method to change the language and persist it
  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang)
    localStorage.setItem('language', lang); // Save the selected language to localStorage
  }

}