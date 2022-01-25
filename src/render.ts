import { Child } from './_'

/*
* render()
*
* Allow for the rendering of Nodes and Interfaces into DOM objects
*/

export function render(node: Child) {
    if (typeof node === 'string') return document.createTextNode(node)

    const { type, attributes, children } = node

    /*
    * Stage 1 - Element creation
    */

    const element = document.createElement(type)

    /*
    * Stage 2 - Attributes
    */

    for (const [ attr, value ] of Object.entries(attributes)) {

        /* Check for Event Listener */

        if (attr.startsWith('@') && typeof value === 'function') {
            const event = attr.substring(1)
            element.addEventListener(event, value)

            continue
        }

        element.setAttribute(attr, value.toString())
    }

    /*
    * Stage 3 - Children
    */

    children.map(child =>
        element.append( render(child) )
    )

    return element
}