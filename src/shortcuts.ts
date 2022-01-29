import { _, Attributes, Child } from './_'

/*
* Some simple shortcuts for the most used HTML elements
*/

/* Containers */

export function main(attrs: Attributes, ...children: Child[]) {
    return _('main', attrs, ...children)
}

export function nav(attrs: Attributes, ...children: Child[]) {
    return _('nav', attrs, ...children)
}

export function div(attrs: Attributes, ...children: Child[]) {
    return _('div', attrs, ...children)
}

export function form(attrs: Attributes, ...children: Child[]) {
    return _('form', attrs, ...children)
}

/* Text stuff */

export function p(attrs: Attributes, ...children: Child[]) {
    return _('p', attrs, ...children)
}

export function span(attrs: Attributes, ...children: Child[]) {
    return _('span', attrs, ...children)
}

/* Heading functions */

export function h1(attrs: Attributes, ...children: Child[]) {
    return _('h1', attrs, ...children)
}

export function h2(attrs: Attributes, ...children: Child[]) {
    return _('h2', attrs, ...children)
}

export function h3(attrs: Attributes, ...children: Child[]) {
    return _('h3', attrs, ...children)
}

export function h4(attrs: Attributes, ...children: Child[]) {
    return _('h4', attrs, ...children)
}

export function h5(attrs: Attributes, ...children: Child[]) {
    return _('h5', attrs, ...children)
}

export function h6(attrs: Attributes, ...children: Child[]) {
    return _('h6', attrs, ...children)
}

/* Miscellaneous */

export function a(attrs: Attributes, ...children: Child[]) {
    return _('a', attrs, ...children)
}

export function img(attrs: Attributes) {
    return _('a', attrs, ...[])
}

export function button(attrs: Attributes, ...children: Child[]) {
    return _('button', attrs, ...children)
}

export function input(attrs: Attributes) {
    return _('button', attrs, ...[])
}

export function textarea(attrs: Attributes) {
    return _('button', attrs, ...[])
}