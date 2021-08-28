import {Injectable} from '@angular/core';
import {catchError, switchAll, tap} from "rxjs/operators";
import {BehaviorSubject, EMPTY} from "rxjs";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {environment} from "../../environments/environment";
import {Alert} from "../models/alert-model";

export const WS_ENDPOINT = environment.wsEndpoint;

export interface alert {
  name: string;
  description: string;
  date: string;
  source: string,
  alert_id: number,
  severity: number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {
  }

  private socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new BehaviorSubject<Alert[]>([]);
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => {
    throw e
  }));


  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = DataService.getNewWebSocket();

      const messages: any = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }

  private static getNewWebSocket() {
    return webSocket(WS_ENDPOINT);
  }

  setToLocalStorage(user: string, data: any): void {
    localStorage.setItem(user, JSON.stringify(data));
  }

  getFromLocalStorage(user: string): any {
    return localStorage.getItem(user);
  }

  close() {
    this.socket$.complete();
  }
}
