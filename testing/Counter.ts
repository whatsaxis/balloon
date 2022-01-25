import { _ } from '../src'
import { Interface } from '../src/Interface'

import { render } from '../src/render'

const RandomNumberInterface: Interface = (props, api) => {
    const randomNumber = Math.round(Math.random() * 100)

    return _('h1', {
        '@click': () => console.log('Hello!')
    }, 'My random number is: ' + randomNumber)
}

const MyInterface: Interface<{ number: number }, null> = (props, api) => {
    return _('div', { }, 'Howdy! My number is ' + props.number, RandomNumberInterface({}, null))
}

document.body.append(
    render(
        MyInterface({ number: 5 }, null)
    )
)