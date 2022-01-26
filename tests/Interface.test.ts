import { Interface } from '../src/Interface'
import { API } from '../src/API'

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

    
    test('can build a simple element with an API', () => {

        /* Define API */
        
        class LanguageAPI extends API<{ language: 'Python' }> {
            constructor() {
                super({
                    data: {
                        language: 'Python'
                    }
                })
            }
        }

        const api = new LanguageAPI()

        /* Define Interface */

        const SomeInterface: Interface<{}, LanguageAPI> = (props, api): Node => {
            return _('code', {}, 'I love ' + api.data.language + '!')
        }
        
        expect( SomeInterface({}, api) ).toEqual<Node>({
            type: 'code',
            attributes: {},
            children: ['I love Python!']
        })
        
    })

    test('can build a multiple nested interfaces with APIs and props', () => {

        /* Define API */
        
        class LanguageAPI extends API<{ language: 'Python' }> {
            constructor() {
                super({
                    data: {
                        language: 'Python'
                    }
                })
            }
        }

        const api = new LanguageAPI()

        /* Define Interfaces */
        
        const AnotherInterface: Interface<{ color: string }, LanguageAPI> = (props, api) => {
            return _('div', {
                'style': `color: ${ props.color }`
            }, `${ api.data.language } on top!`)
        }
        
        const SomeInterface: Interface<{ }, LanguageAPI> = (props, api): Node => {
            return _('div', {}, 
                _('code', {}, 'I love ' + api.data.language + '!'),
                AnotherInterface({ color: 'red' }, api)
            )
        }
        
        expect( SomeInterface({ }, api) ).toEqual<Node>({
            type: 'div',
            attributes: {},
            children: [
                {
                    type: 'code',
                    attributes: {},
                    children: [
                        'I love Python!'
                    ]
                },
                {
                    type: 'div',
                    attributes: {
                        'style': 'color: red'
                    },
                    children: [
                        'Python on top!'
                    ]
                }
            ]
        })
        
    })

})