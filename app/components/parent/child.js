import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { resource, use } from 'ember-resources';
import { TrackedObject } from 'tracked-built-ins';

export default class ParentChildComponent extends Component {
  @service
  store;

  @use
  defaultTitle = resource(() => {
    const state = new TrackedObject({});

    // Always falsy for the sake of this example
    const defaultValueForTitle = '';

    if (defaultValueForTitle) {
      // Never runs in this example
      state.value = defaultValueForTitle;
    } else if (this.args.noteId) {
      // This will run multiple times after step 3
      this.store.findRecord('note', this.args.noteId).then((note) => {
        state.value = note.get('title');
      });
    }

    return state;
  });
}
