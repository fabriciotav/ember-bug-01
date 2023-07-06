import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { TrackedObject } from 'tracked-built-ins';

import { use, resourceFactory, resource } from 'ember-resources';

const NameOf = resourceFactory((idFn) => {
  return resource(({ owner }) => {
    const state = new TrackedObject({ value: 'defaultTitle' });
    const store = owner.lookup('service:store');
    // we delayed using the tracked @noteId
    // until this invocation
    const id = idFn();

    const refreshNote = async () => {
      // wait a bit so we don't auto-track peekRecord
      // or anything else in this function
      await Promise.resolve();
      let record = store.peekRecord('note', id);

      if (record) {
        let note = await record.reload();
        state.value = note.title;
        return;
      }
      let note = await store.findRecord('note', id);
      state.value = note.title;
    };

    // is only called when @noteId changes
    // because it is the only tracked data we used here
    if (id) {
      refreshNote();
    }

    return () => state.value;
  });
});

export default class ParentChildComponent extends Component {
  @use title = NameOf(() => this.args.noteId);
}
