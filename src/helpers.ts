import { Node } from './_'

/*
* Some useful helper functions
*/

export function isNode(thing: any): thing is Node {
    if (typeof thing !== 'object') return false

    const obj = (thing as Object)

    if (
        obj.hasOwnProperty('type') &&
        obj.hasOwnProperty('attributes') &&
        obj.hasOwnProperty('children')
    ) return true

    return false
}