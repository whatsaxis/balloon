import { _, Node } from '../src/_'

/*
* _()
*
* Basic Node creation function
*/

describe('_() - Node creation function', () => {

    test('should create a valid node', () => {
        expect( _('div', { }) ).toEqual<Node>({
            type: 'div',
            attributes: { },
            children: []
        })
    })

    test('should create a valid node with an attribute', () => {
        expect( _('div', { style: 'color: red' }) ).toEqual<Node>({
            type: 'div',
            attributes: {
                style: 'color: red'
            },
            children: []
        })
    })

    test('should create a valid node with multiple attributes', () => {
        expect( _('div', { class: 'my-div', style: 'color: red' }) ).toEqual<Node>({
            type: 'div',
            attributes: {
                class: 'my-div',
                style: 'color: red'
            },
            children: []
        })
    })

    test('should create a valid node with a child', () => {
        expect(
            _(
                'div',
                {},
                _('h1', {}, 'Hello world!')
            )
        ).toEqual<Node>({
            type: 'div',
            attributes: { },
            children: [
                {
                    type: 'h1',
                    attributes: {},
                    children: ['Hello world!']
                }
            ]
        })
    })

    test('should create a valid node with multiple children', () => {
        expect(
            _(
                'div',
                {},
                _('h1', {}, 'Hello world!'),
                _('h2', {}, "I'm just a simple <h2> tag!")
            )
        ).toEqual<Node>({
            type: 'div',
            attributes: { },
            children: [
                {
                    type: 'h1',
                    attributes: {},
                    children: ['Hello world!']
                },
                {
                    type: 'h2',
                    attributes: {},
                    children: ["I'm just a simple <h2> tag!"]
                },
            ]
        })
    })
})