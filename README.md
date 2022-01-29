# balloon 🎈
A tiny, hyper-fast, and *extremely incomplete* prototyping framework to make your projects fly! 🎈

## Philosophy
When designing 🎈, we decided to take a slightly different appraoch. Instead of the traditional stateful component-based architecture of that many modern frameworks (React, Vue, Angular, etc.) utilize, we split the state and the UI into separate parts - APIs and Interfaces.

Interfaces are essentially an empty shell or template, into which values from an API and / or props can be injected. These values, along with other methods, are provided from APIs. Multiple Interfaces can be connected to an API, but only one API can be connected to an interface - if you need more, then you can probably simplify things down further! Furthermore, several instances of an API can be created if needed. Additionally, with the use of generics, APIs and Interfaces integrate seamlessly with strict type checking, allowing for values to appear in IDE autocomplete.

Please note that this was made over the course of 3 days, and is very much lacking in features a modern framework would have. It was just an experiment, after 6 failed attempts, to create something similar to a modern UI framwork - surprisingly, it ended up quite good! Please do not actually use this, as it is very likely full of security flaws and bugs.

## Basic Examples
Here are some basic examples of apps in 🎈 - with Balloon, the possibilites are ~~limitless~~ very limited!


### Counter

```ts
class CounterAPI extends API<{ counter: number }> {
    constructor() {
        super({
            data: {
                counter: 0
            }
        })
    }
}

const api = new CounterAPI()

/* Interface */

const CounterInterface: Interface<{}, CounterAPI> = (props, api) => {
    return _('div', {},
    
        _('h1', {}, `Counter: ${ api.data.counter }`),
        _('button', {
            '@click': () => api.data.counter ++
        }, 'Click me!')

    )
}

/* Mount app */

mount( CounterInterface, { }, api )
```

### Character Counter

```ts
/* Initialize API */

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

/* Interface */

const ChatCounter: Interface<{ }, CharCounterAPI> = (props, api) => {
    let color = 'black'

    const len = api.data.chars.length

    if (len > 100) color = 'red'

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
```