export class Link {
  rel = '';
  href = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
