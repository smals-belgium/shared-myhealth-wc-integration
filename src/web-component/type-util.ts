/** 
 * Convert camelCase to kebab-case in string types.
 * Useful for converting property names to attribute names.
 */
export type KebabCase<T extends string, A extends string = ''> =
    T extends `${infer F}${infer R}` ?
    KebabCase<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`> :
    A;
