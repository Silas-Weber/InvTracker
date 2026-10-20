import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface CsItem {
  marketHashName: string;
  minPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class Steam {
  private readonly http = inject(HttpClient);
  private baseUrl = 'https://localhost:7036';

getSkinportItems() {
  this.http.get<CsItem[]>(this.baseUrl + "/api/items").subscribe({
next: items => {
  try {
    localStorage.setItem("skinportItems", JSON.stringify(items));
    console.log(`${items.length} Items gespeichert`);
  } catch (error) {
    console.error("Speichern fehlgeschlagen:", error);
  }
}
  })
}



}
