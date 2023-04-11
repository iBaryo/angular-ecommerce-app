import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandService implements ReturnType<BrandService['calcBrand']>{
  public readonly name: string;
  public readonly imgSrc: string;
  public readonly category: string;
  public readonly cdp: { readonly bUnitId: string; readonly appId: string; };

  constructor() {
    Object.assign(this, this.calcBrand());
  }

  private calcBrand() {
    switch (document.location.hostname) {
      case 'brand2.com':
        return {
          name: 'BRAND 2',
          imgSrc: 'https://e7.pngegg.com/pngimages/393/319/png-clipart-duff-beer-logo-duff-beer-homer-simpson-duffman-ale-decal-text-logo.png',
          category: 'Beers',
          cdp: {
            bUnitId: '4_xSdBCmsTbgmbILdqjYC68Q',
            appId: 'HN6ptd7u0ysDYopD3BRf7A',
          }
        };
      case 'brand3.com':
        return {
          name: 'BRAND 3',
          category: 'Electronics',
          imgSrc: 'https://ih1.redbubble.net/image.209571484.8798/st,small,507x507-pad,600x600,f8f8f8.jpg',
          cdp: {
            bUnitId: '4_aT0qv3LIPJK1loKdzJ1yXw',
            appId: 'HEb2_hmBbcUK28nFf8aW7w',
          }
        };
      default:
        return {
          name: 'BRAND 1',
          category: 'Shoes',
          imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Futurama_Planet_Express.svg',
          cdp: {
            bUnitId: '4_SDY-XOeZgJf0bcHdJ5HEiw',
            appId: 'HJgdAZ30mBmGmcX9b3Gg3g',
          }
        };
    }
  }

}
