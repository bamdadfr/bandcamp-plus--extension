import {BandcampData} from '../facades/bandcamp.facade';

interface MetaContent {
  item_id: number;
}

interface Crumbs {
  collect_item_cb: string;
  uncollect_item_cb: string;
}

export class BandcampTrackParser {
  public is_wishlisted: boolean;

  public fan_id: number;

  public band_id: number;

  public item_id: number;

  public item_type: string;

  public data_referrer_token: string;

  public collect: string;

  public uncollect: string;

  private collectCrumb: string;

  private uncollectCrumb: string;

  private pageData: HTMLDivElement;

  private string: string;

  private json: BandcampData;

  private meta: HTMLMetaElement;

  private metaContent: MetaContent;

  private script: HTMLScriptElement;

  private crumbs: HTMLMetaElement;

  private crumbsData: Crumbs;

  private document: Document;

  public constructor(doc: Document) {
    this.document = doc;

    this.pageData = this.document.querySelector('#pagedata');
    this.string = this.pageData.dataset.blob;
    this.json = JSON.parse(this.string);

    this.meta = this.document.querySelector('meta[name="bc-page-properties"]');
    this.metaContent = JSON.parse(this.meta.content);

    this.script = this.document.querySelector('script[data-referrer-token]');

    this.crumbs = this.document.querySelector('#js-crumbs-data');
    this.crumbsData = JSON.parse(this.crumbs.dataset.crumbs);

    this.is_wishlisted = this.json.fan_tralbum_data.is_wishlisted;
    this.fan_id = this.json.fan_tralbum_data.fan_id;
    this.band_id = this.json.fan_tralbum_data.band_id;
    this.item_id = this.metaContent.item_id;
    this.item_type = 'track';
    this.data_referrer_token = JSON.parse(this.script.dataset.referrerToken);
    this.collectCrumb = this.crumbsData.collect_item_cb;
    this.uncollectCrumb = this.crumbsData.uncollect_item_cb;

    this.collect = new URLSearchParams({
      fan_id: this.fan_id.toString(),
      band_id: this.band_id.toString(),
      item_id: this.item_id.toString(),
      item_type: this.item_type.toString(),
      data_referrer_token: this.data_referrer_token.toString(),
      crumb: this.collectCrumb.toString(),
    }).toString();

    this.uncollect = new URLSearchParams({
      fan_id: this.fan_id.toString(),
      band_id: this.band_id.toString(),
      item_id: this.item_id.toString(),
      item_type: this.item_type.toString(),
      data_referrer_token: this.data_referrer_token.toString(),
      crumb: this.uncollectCrumb.toString(),
    }).toString();
  }
}
