import { Node, AT } from './_'
import { isNode } from './helpers'
import { API } from './API'

/*
* Interface
*
* A portal to another dimension! Seriously, an Interface is
* simply an empty shell of HTML into which values can be injected
* using an API.
*/

export type Props = { [prop: string]: AT }

/* Interface Definition */

export type Interface<
    P extends Props = { },
    A extends API<any> | null = null
> =
    (
        props: P, api: A
    ) => Node

// To be called in the render function and return an
// error if it is not an Interface. However, it serves
// a double purpose - it will also pre-render it if it is
// indeed an interface.

export function isInterface<
    P extends Props = { },
    A extends API<any> | null = null
>(
    thing: any,
    props: P,
    api: A
): typeof thing extends Interface<P, A> ? Node : false {
    if (typeof thing !== 'function') return false

    // Check if return type is Node
    const render = (thing as Interface<P, A>)(props, api)

    if (isNode(render)) return (render as Node)
    return false
}