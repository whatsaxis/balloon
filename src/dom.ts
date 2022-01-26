import { render } from './render'

import { API } from './API'
import { Interface, Props } from './Interface'

import { Child, Node } from './_'
import { isEqual } from './helpers'

/*
* DOM
*
* Responsible for diffing the DOM and making changes.
*/

/*
* mount()
*
* Initial lifecycle function, marking a beginning to the application.
*/

interface BaseApp {
    app: Interface<any, any>,
    domNode: HTMLElement
    props: Props,
    api: API<any>
}

let app: BaseApp

let dom: Node
let prevDOM: Node

export function mount(node: Interface<any, any>, props: Props, api: API<any>) {
    /*
    * Initial Render - Prepare the DOM
    */

    dom = node(props, api)
    prevDOM = node(props, api)
   
    const domNode = render(dom)


    app = {
        app: node,
        domNode: (domNode as HTMLElement),
        props,
        api
    }
   
    document.body.append( domNode )
}


/*
* diff()
*
* Likely the most important function - finds and changes any differences
* between two DOM models. Used for reactivity.
*/

export function diff(domA: Child, domB: Child, elem: HTMLElement | Text) {
    const A = domA as Node
    const B = domB as Node

    /*
    * Cases with strings
    */

    if (typeof A === 'string' && typeof B === 'string') {
        if (A === B) return
        
        (elem as Text).textContent = A
        return
    }

    if (typeof A === 'string') {
        elem.replaceWith( document.createTextNode(A) )

        return
    }

    else if (typeof B === 'string') {
        elem.replaceWith( render(A) )

        return
    }

    /*
    * Stage 1 - Attribute Diffing
    */


    Object.entries(A.attributes).map(([attr, value]) => {
        if (typeof value === 'function') return
        if (B.attributes[attr] === value) return

        (elem as HTMLElement).setAttribute(attr, value.toString())
    })


    /*
    * Stage 2 - Children
    */


    let ctr = -1
    for (const child of A.children) {
        ctr++

        const childA = child
        const childB = B.children[ctr] ? B.children[ctr] : null
        const element = elem.childNodes.item(ctr) as HTMLElement | Text
        
        if (isEqual(childA as Node, childB as Node)) continue

        if (element === null || childB === null) {
            (elem as HTMLElement).append( render(childA) )
            continue
        }

        diff(childA, childB, element)
    }

    for (let i = ctr + 1; i < elem.childNodes.length; i++) {
        elem.childNodes.item(i).remove()
    }
}

/*
* renderDOM()
*
* Shortcut function to render the DOM using the diff() function
*/

export function renderDOM() {
    prevDOM = dom
    dom = app.app(app.props, app.api)
    
    diff(dom, prevDOM, app.domNode)
}