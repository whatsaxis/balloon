import { _ } from '../src'

console.log(
    _('div', {},
        _('div', {}, 'Hello world!')
    )
)