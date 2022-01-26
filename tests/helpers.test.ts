import { isNode } from '../src/helpers'
import { isInterface, Interface } from '../src/Interface'

import { Node, _ } from '../src/_'


describe('helpers.ts - Useful helper functions', () => {

    /*
    * isNode()
    *
    * We don't actually need to check for the types of the values,
    * so we aren't testing that. This is just to distinguish simple
    * objects from Nodes.
    */

    describe('isNode()', () => {
        test('can check for a valid node', () => {
            const node: Node = {
                type: 'div',
                attributes: {},
                children: []
            }

            expect( isNode(node) ).toBe(true)
        })

        test('can check for an invalid node - object', () => {
            const node = {
                type: 'div',
                attributes: {}
            }

            expect( isNode(node) ).toBe(false)
        })

        test('can check for an invalid node - not object', () => {
            const node = 'Hello world!'

            expect( isNode(node) ).toBe(false)
        })
    })

    /*
    * isInterface()
    *
    * Check if something is an Interface. If it is, pre-render
    * for efficiency. If not, return false.
    */ 

    describe('isInterface()', () => {
        test('can check for a valid interface', () => {
            const int: Interface = () => {
                return _('h1', {}, 'Hello!')
            }

            expect( isInterface(int, {}, null) ).toEqual<Node>({
                type: 'h1',
                attributes: {},
                children: ['Hello!']
            })
        })

        test('can check for a valid nested interface', () => {
            const A: Interface = () => {
                return _('h1', {}, 'Hello! 1')
            }

            const B: Interface = () => {
                return _('div', {}, 'Hello! 2', A({}, null))
            }

            expect( isInterface(B, {}, null) ).toEqual<Node>({
                type: 'div',
                attributes: {},
                children: [
                    'Hello! 2',
                    {
                        type: 'h1',
                        attributes: {},
                        children: ['Hello! 1']
                    }
                ]
            })
        })

        test('can check for a Node', () => {
            expect( isInterface(_('div', {}, 'Hi Mom!'), {}, null) ).toBe(false)
        })

        test('can check for a non-valid item', () => {
            expect( isInterface('Hi mom!', {}, null) ).toBe(false)
        })
    })
    
})