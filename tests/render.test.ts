import { render } from '../src/render'

import { Interface } from '../src'
import { _ } from '../src/_'


describe('Rendering - Render Nodes to the DOM', () => {
    
    test('can render a simple node', () => {
        const elem = render(
            _('div', {})
        ) as HTMLElement

        expect( elem.outerHTML ).toBe('<div></div>')
    })

    test('can render a simple node with an attribute', () => {
        const elem = render(
            _('div', {
                'class': 'my-div'
            })
        ) as HTMLElement

        expect( elem.outerHTML ).toBe('<div class="my-div"></div>')
    })

    test('can render a simple node with multiple attributes', () => {
        const elem = render(
            _('div', {
                'id': 'my-favourite-div',
                'class': 'my-div'
            })
        ) as HTMLElement

        expect( elem.outerHTML ).toBe('<div id="my-favourite-div" class="my-div"></div>')
    })
    
    test('can render a simple node with a valid event listener', () => {
        let clicked = false

        const elem = render(
            _('div', {
                '@click': () => clicked = true
            })
        ) as HTMLElement

        expect( elem.outerHTML ).toBe('<div></div>')
        
        elem.click()

        expect( clicked ).toBe(true)
    })

    test('can render nested nodes', () => {
        const elem = render(
            _('div', {},
                _('h1', {}, 'Hello world!')
            )
        ) as HTMLElement

        expect( elem.outerHTML ).toBe('<div><h1>Hello world!</h1></div>')
    })

    test('can render an Interface', () => {
        const int: Interface = () => {
            return _('div', {},
                _('h1', {}, 'Hello world!'),
                _('code', {}, 'I love Balloon!')
            )
        }

        const rendered = render( int({}, null) ) as HTMLElement

        expect( rendered.outerHTML ).toBe('<div><h1>Hello world!</h1><code>I love Balloon!</code></div>')
    })

    test('can render nested Interfaces', () => {
        const A: Interface = () => {
            return _('h6', {}, "I'm so lonely :(")
        }

        const B: Interface = () => {
            return _('div', {},
                _('h1', {}, 'Hello world!'),
                _('code', {}, 'I love Balloon!'),
                A({}, null)
            )
        }

        const rendered = render( B({}, null) ) as HTMLElement

        expect( rendered.outerHTML ).toBe("<div><h1>Hello world!</h1><code>I love Balloon!</code><h6>I'm so lonely :(</h6></div>")
    })
})