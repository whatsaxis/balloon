import { Interface, _ } from '../src'
import { API } from '../src/API'

import { mount, diff } from '../src/dom'


describe('DOM - The bridge between JS and HTML', () => {

    describe('mount() - Mount an initial Interface', () => {
        beforeEach(() => {
            document.body.innerHTML = ''
        })

        test('can mount an Interface', () => {
            const myInterface: Interface = () => {
                return _('div', {},
                    'Hello world!'
                )
            }

            mount( myInterface, {}, null )

            expect( document.body.innerHTML ).toBe('<div>Hello world!</div>')
        })
    })

    describe('diff() - Find and render differences between two DOM instances', () => {
        beforeEach(() => {
            document.body.innerHTML = ''
        })

        test('can diff two basic elements', () => {
            const elem = document.createElement('div')
            elem.innerHTML = 'Hello world!'

            document.body.append(elem)

            diff(
                _('div', {}, 'Hi world!'),
                _('div', {}, 'Hello world!'),
                elem
            )

            expect( document.body.innerHTML ).toBe('<div>Hi world!</div>')
        })

        test('can diff two basic text nodes', () => {
            const elem = document.createTextNode('Hi Mom!')
            document.body.append(elem)

            diff(
                'Hi Dad!',
                'Hi Mom!',
                elem
            )

            expect( document.body.innerHTML ).toBe('Hi Dad!')
        })

        test('can diff an unexpected case', () => {
            const elem = document.createElement('div')
            document.body.append(elem)

            diff(
                'Hi Dad!',
                'Hi Mom!',
                elem
            )

            expect( document.body.innerHTML ).toBe('<div>Hi Dad!</div>')
        })
        
        test('can diff a string and an element | Element -> String', () => {
            const elem = document.createElement('div')
            elem.innerHTML = 'Nothing here :('

            document.body.append(elem)

            diff(
                'Hi!',
                _('div', {}, 'Nothing here :('),
                elem
            )

            expect( document.body.innerHTML ).toBe('Hi!')
        })

        test('can diff a string and an element | String -> Element', () => {
            const elem = document.createTextNode('Hi!')
            document.body.append(elem)

            diff(
                _('div', {}, 'Nothing here :('),
                'Hi!',
                elem
            )

            expect( document.body.innerHTML ).toBe('<div>Nothing here :(</div>')
        })

        test('can diff in a simple application', () => {

            /* Define API */

            class CounterAPI extends API<{ counter: number, otherCounter: number }> {
                constructor() {
                    super({
                        data: {
                            counter: 0,
                            otherCounter: 0
                        }
                    })
                }
            }

            const api = new CounterAPI()

            /* Define Interfaces */

            const CounterButtonA: Interface<{ }, CounterAPI> = (props, api) => {
                return _(
                    'button', {
                        '@click': () => api.data.counter++,
                        'class': api.data.counter.toString()
                    }, `A: ${ api.data.counter }`
                )
            }

            const CounterButtonB: Interface<{ increment: number }, CounterAPI> = (props, api) => {
                return _('button', {
                    '@click': () => api.data.otherCounter += props.increment,
                    'class': api.data.otherCounter.toString()
                }, `B: ${ api.data.otherCounter }`)
            }

            const CounterApp: Interface<{ }, CounterAPI> = (props, api) => {
                return _(
                    'div', { },
                    CounterButtonA({ }, api),
                    CounterButtonB({ increment: 5 }, api),
                    _('span', {
                        'style': api.data.counter > 10 ? 'color: red' : 'color: black'
                    }, `Product: ${ api.data.counter * api.data.otherCounter }`)
                )
            }

            mount( CounterApp, { }, api )


            expect( document.body.innerHTML ).toBe('<div><button class="0">A: 0</button><button class="0">B: 0</button><span style="color: black">Product: 0</span></div>')
            /* Make some changes! */

            api.data.counter = 11

            expect( document.body.innerHTML ).toBe('<div><button class="11">A: 11</button><button class="0">B: 0</button><span style="color: red">Product: 0</span></div>')


            api.data.counter = 1000
            api.data.otherCounter = 5000

            expect( document.body.innerHTML ).toBe('<div><button class="1000">A: 1000</button><button class="5000">B: 5000</button><span style="color: red">Product: 5000000</span></div>')
        })
    })

})