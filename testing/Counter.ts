import { _ } from '../src'
import { Interface, isInterface } from '../src/Interface'

console.log(
    _('div', {},
        _('div', {}, 'Hello world!')
    )
)

const RandomNumberInterface: Interface = (props, api) => {
    const randomNumber = Math.round(Math.random() * 100)
    return _('h1', { }, 'My random number is: ' + randomNumber)
}

const MyInterface: Interface<{ number: number }, null> = (props, api) => {
    return _('div', { }, 'Howdy! My number is ' + props.number, RandomNumberInterface({}, null))
}

console.log(MyInterface({ number: 10 }, null))