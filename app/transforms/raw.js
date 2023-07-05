import Transform from '@ember-data/serializer/transform';

export default class RawTransform extends Transform {
  // This gets called infinitely
  deserialize(serialized) {
    console.log('call to RawTransform.deserialize');

    return serialized;
  }

  serialize(deserialized) {
    return deserialized;
  }
}
