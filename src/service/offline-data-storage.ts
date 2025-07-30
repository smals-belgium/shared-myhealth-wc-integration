/**
 * @summary
 * The offline data storage service provides methods to store, retrieve, and remove data from the store,
 * allowing the data to be used even when the user is offline.
 *
 * @description
 * It is a key-value store where the data is persisted on the user's device.
 * The service is always available, but usage is optional.
 * Note that each family of web components is supposed to receive their own area in the offline data storage.
 * This data is encrypted by the host before being stored, and decrypted when being retrieved,
 * therefore it has similar methods to a `Map`, but they're all asynchronous.
 */
export type OfflineDataStorage = Readonly<{

  /**
   * Return the data associated with the given `key` from the store.
   * Return `null` if no such data exists in the store.
   */
  get: <T = unknown>(key: string) => Promise<T | null>;

  /**
   * Store the given `value` in the store and associate it with the given `key`.
   */
  set: <T>(key: string, value: T) => Promise<void>;

  /**
   * Entirely delete from the store the data associated with the given `key`.
   * Does nothing if the given `key` does not exist in the store.
   */
  delete: (key: string) => Promise<void>;

}>;
