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
      // Refetching the record with `findRecord` triggers the bug
      // Doing it with the `peekRecord`/`reload` combo does not
      const record = this.store.peekRecord('note', this.args.noteId);

      if (record) {
        record.reload().then((note) => {
          state.value = note.get('title');
        });
      } else {
        // This now works
        this.store.findRecord('note', this.args.noteId).then((note) => {
          state.value = note.get('title');
        });
      }
    }

    return state;
  });
}
