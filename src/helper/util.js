const uidCounters = {};

/**
 * Returns a UID.
 * @param {String} id= - Identifier base name
 * @return {number} uid
 **/
export function uid(id = "id") {
    uidCounters[id] = uidCounters[id] || 1;
    const count = uidCounters[id]++;
    return `${id}-${count}`;
}

// Returns true if given object is empty, false otherwise.
export function isObjectEmpty(obj) {
    let isEmpty = true;
    /* eslint-disable no-unused-vars  */
    for (const key in obj) {
        isEmpty = false;
        break;
    }
    /* eslint-enable no-unused-vars  */
    return isEmpty;
}
