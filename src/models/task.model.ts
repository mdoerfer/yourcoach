export class Task {
  private _id: string;
  private _from: string;
  private _to: string;
  private _title: string;
  private _description: string;
  private _difficulty: string;
  private _rating: number;
  private _response: string;
  private _responseInstructions: string;
  private _state: string;
  private _created_at: number;
  private _updated_at: number;

  set id(tid: string) {
    this._id = tid;
  }

  get id() : string {
    return this._id;
  }

  set from(uid: string) {
    this._from = uid;
  }

  get from() : string {
    return this._from;
  }

  set to(uid: string) {
    this._to = uid;
  }

  get to() : string {
    return this._to;
  }

  get from_to() : string {
    return this.from + '_' + this.to;
  }

  set title(title: string) {
    this._title = title;
  }

  get title() : string {
    return this._title;
  }

  set description(description: string) {
    this._description = description;
  }

  get description() : string {
    return this._description;
  }

  set difficulty(difficulty: string) {
    this._difficulty = difficulty;
  }

  get difficulty() : string {
    return this._difficulty;
  }

  set rating(rating: number) {
    this._rating = rating;
  }

  get rating() : number {
    return this._rating;
  }

  set response(response: string) {
    this._response = response;
  }

  get response() : string {
    return this._response;
  }

  set responseInstructions(responseInstructions: string) {
    this._responseInstructions = responseInstructions;
  }

  get responseInstructions() : string {
    return this._responseInstructions;
  }

  set state(state: string) {
    this._state = state;
  }

  get state() : string {
    return this._state;
  }

  set created_at(timestamp: number) {
    this._created_at = timestamp;
  }

  get created_at() : number {
    return this._created_at;
  }

  set updated_at(timestamp: number) {
    this._updated_at = timestamp;
  }

  get updated_at() : number {
    return this._updated_at;
  }
}
