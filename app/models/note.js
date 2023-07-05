import Model, { attr } from '@ember-data/model';

export default class V3Note extends Model {
  @attr('string')
  title;

  @attr('string')
  body;

  // This is the problematic attribute
  @attr('raw')
  settings;
}
