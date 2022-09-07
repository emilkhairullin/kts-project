import { action, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export type QSParamType =
  | string
  | string[]
  | qs.ParsedQs
  | qs.ParsedQs[]
  | undefined;

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      setSearch: action,
    });
  }

  getParam(key: string): QSParamType {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }
}
