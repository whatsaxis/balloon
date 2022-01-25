/*
* _()
*
* The base function used for creating nodes and as a base for any
* alternative syntax
*/

/* Node-specific types */

type Tag = keyof HTMLElementTagNameMap

export type AT = string | number | boolean
type Attribute = AT | AT[] | ((event: Event) => void)

type Attributes = {
    [attr: string]: Attribute
}

export interface Node {
    type: Tag,
    attributes: Attributes,
    children: Child[]
}

/* Types including Nodes */

type Child = Node | string
export type Fragment = Node[]

/*
* Base function for creating nodes
*/
export function _(type: Tag, attributes: Attributes, ...children: Child[]): Node {
    return {
        type, attributes, children
    }
}