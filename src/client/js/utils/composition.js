import merge from 'deepmerge';
export const mergeObjectStructures = (destination, source) =>
    merge(destination, source);
