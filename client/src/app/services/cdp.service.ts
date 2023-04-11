import {Injectable} from "@angular/core";

declare const gigya: any;

@Injectable({
  providedIn: 'root'
})
export class CDP {
  private _api: { report<T extends object>(eventName: string, payload: T): Promise<void>; }

  public async init(bUnitId: string, appId: string) {
    this._api = await gigya.cdp.init({
      apiDomain: 'EU5',
      bUnitId,
      appId
    });
  }

  public get api() {
    return this._api;
  }
}
