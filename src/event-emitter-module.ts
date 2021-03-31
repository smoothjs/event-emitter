import { EventEmitter2 } from 'eventemitter2'
import { Config } from '@smoothjs/config'
import { IListeners } from './interfaces'
import { EventSubscribersLoader } from './event-subscribers-loader'
import { Container, ObjectFactory, Scope } from 'typescript-ioc'

export class EventEmitterModule {
  static fire(application: IListeners) {
    const config: Config = new Config()
    const eventEmitterFactory: EventEmitter2 = new EventEmitter2(
      config.get('eventemitter2', {
        wildcard: true,
        delimiter: '.',
        newListener: false,
        removeListener: false,
        maxListeners: 10,
        verboseMemoryLeak: false,
        ignoreErrors: false,
      })
    )

    return new EventSubscribersLoader(application, eventEmitterFactory).loadEventListeners()
  }
}
