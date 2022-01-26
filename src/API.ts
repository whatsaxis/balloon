import { AT } from './_'
import { renderDOM } from './dom'

/*
* API
*
* Data structures used for holding state that can be utilized inside an Interface.
*/

type APIData = { [key: string]: AT | AT[] }

interface APIOptions<D extends APIData> {
    data: D
}

export abstract class API<D extends APIData> {
    private internalData: APIData
    data: D

    constructor(options: APIOptions<D>) {
        const { data } = options

        this.internalData = { }
        this.data = data

        /*
        * Apply getters and setters for the data, to trigger
        * a re-render on change.
        */

        const T = this

        Object.entries(data).map(([key, value]) => {

            T.internalData[key] = value

            Object.defineProperty(this.data, key, {
                get() {
                    return T.internalData[key]
                },

                set(newValue: AT) {
                    T.internalData[key] = newValue
                    renderDOM()
                }
            })

        })
    }
}