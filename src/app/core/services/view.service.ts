import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  showThreadSection: boolean = false;

  constructor() { }
}
