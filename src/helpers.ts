import { Node } from './_'

/*
* Some useful helper functions
*/

export function isNode(thing: any): thing is Node {
    if (typeof thing !== 'object' || thing === null) return false

    const obj = (thing as Object)

    if (
        obj.hasOwnProperty('type') &&
        obj.hasOwnProperty('attributes') &&
        obj.hasOwnProperty('children')
    ) return true

    return false
}

/*
* isEqual()
*
* Compare if two Nodes are the same
*/

export function isEqual(a: Node, b: Node) {
    if (!isNode(a) && !isNode(b) || isNode(a) && !isNode(b) || isNode(b) && !isNode(a)) return a === b

    return (
        a.type === b.type &&
        a.attributes === b.attributes &&
        a.children === b.children
    )
}