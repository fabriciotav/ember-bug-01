/* eslint-disable ember/no-classic-classes */
import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default JSONAPIAdapter.extend({
  host: '/',

  namespace: 'api',
});
