import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ParentComponent extends Component {
  @tracked
  noteId = null;

  @action
  setNoteIdToNull() {
    this.noteId = null;
  }

  @action
  setNoteIdToProblematicNote() {
    this.noteId = 'FID_001';
  }

  @action
  setNoteIdToValidNote() {
    this.noteId = 'FID_002';
  }
}
