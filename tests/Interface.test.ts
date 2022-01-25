import { Interface } from '../src/Interface'
import { Node, _ } from '../src/_'


describe('Interface - Basic UI structure', () => {

    test('can build a simple element', () => {

        const SomeInterface: Interface = (props, api): Node => {
            return _('h1', {}, 'Hello world!')
        }
        
        expect( SomeInterface({}, null) ).toEqual<Node>({
            type: 'h1',
            attributes: {},
            children: ['Hello world!']
        })

    })

    test('can build a multiple elements', () => {

        const SomeInterface: Interface = (props, api): Node => {
            return _('div', {}, 
                _('h1', {}, 'Hello world!'),
                _('code', {}, 'I love JS!')
            )
        }
        
        expect( SomeInterface({ }, null) ).toEqual<Node>({
            type: 'div',
            attributes: {},
            children: [
                {
                    type: 'h1',
                    attributes: {},
                    children: ['Hello world!']
                },
                {
                    type: 'code',
                    attributes: {},
                    children: ['I love JS!']
                }
            ]
        })
        
    })

    test('can build a simple element with props', () => {

        const SomeInterface: Interface<{ language: string }> = (props, api): Node => {
            return _('code', {}, 'I love ' + props.language + '!')
        }
        
        expect( SomeInterface({ language: 'Java' }, null) ).toEqual<Node>({
            type: 'code',
            attributes: {},
            children: ['I love Java!']
        })
        
    })

    test('can build a multiple elements with props', () => {

        const SomeInterface: Interface<{ language: string }> = (props, api): Node => {
            return _('div', {}, 
                _('h1', {}, 'Hello world!'),
                _('code', {}, 'I love ' + props.language + '!')
            )
        }
        
        expect( SomeInterface({ language: 'Python' }, null) ).toEqual<Node>({
            type: 'div',
            attributes: { },
            children: [
                {
                    type: 'h1',
                    attributes: {},
                    children: ['Hello world!']
                },
                {
                    type: 'code',
                    attributes: {},
                    children: ['I love Python!']
                }
            ]
        })
        
    })

    /* TODO Tests with an API */

})