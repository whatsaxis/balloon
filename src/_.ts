/*
* _()
*
* The base function used for creating nodes and as a base for any
* alternative syntax
*/

type Tag = keyof HTMLElementTagNameMap

type AT = string | number | boolean
type Attribute = AT | AT[] | ((event: Event) => void)

type Attributes = {
    [attr: string]: Attribute
}

export interface Node {
    type: Tag,
    attributes: Attributes,
    children: Child[]
}

type Child = Node | string

/*
* Base function for creating nodes
*/
export function _(type: Tag, attributes: Attributes, ...children: Child[]): Node {
    return {
        type, attributes, children
    }
}