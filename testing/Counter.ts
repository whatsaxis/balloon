import { _ } from '../src'
import { Interface } from '../src/Interface'

import { mount } from '../src/dom'
import { API } from '../src/API'


class CharCounterAPI extends API<{ chars: string }> {
    constructor() {
        super({
            data: {
                chars: ''
            }
        })
    }
}

const api = new CharCounterAPI()

const ChatCounter: Interface<{ }, CharCounterAPI> = (props, api) => {
    let color = ''

    const len = api.data.chars.length

    if (len > 10) color = 'green'
    if (len > 30) color = 'blue'
    if (len > 50) color = 'orange'
    if (len > 75) color = 'pink'
    if (len > 90) color = 'yellow'

    return _(
        'div', { },

        _('textarea', {
            '@input': (e) => {
                api.data.chars = (e.target as HTMLInputElement).value
            }
        }),

        _('h2', {}, 'Your text: ' + api.data.chars),
        _('h3', {
            style: 'color: ' + color
        }, `Character count: ${ api.data.chars.length }/100`)
    )
}

mount( ChatCounter, { }, api )