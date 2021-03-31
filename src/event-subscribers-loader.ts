import { getMetadata, getMethods } from '@smoothjs/smooth'
import { EventEmitter2 } from 'eventemitter2'
import { Container } from 'typescript-ioc'
import { IListeners } from './interfaces'

export class EventSubscribersLoader {
  constructor(private readonly app: IListeners, private readonly eventEmitter: EventEmitter2) {}

  public loadEventListeners(): EventEmitter2 {
    const listeners = this.app.listerners

    listeners.forEach((listener) => {
      const methods = getMethods(listener)

      methods.forEach((method) => {
        this.subscribeToEventIfListener(listener, method)
      })
    })

    this.bindEventEmitterInstance()

    return Container.get(EventEmitter2)
  }

  public shutdown() {
    this.eventEmitter.removeAllListeners()
  }

  private subscribeToEventIfListener(instance: Record<string, any>, methodKey: string) {
    const eventListenerMetadata =
      getMetadata('EVENT_LISTENER_METADATA', instance, methodKey) || false

    if (!eventListenerMetadata) {
      return
    }

    const { event, options } = eventListenerMetadata

    this.eventEmitter.on(
      event,
      (...args: unknown[]) => instance[methodKey].call(instance, ...args),
      options
    )
  }

  private bindEventEmitterInstance() {
    Container.bind(EventEmitter2).factory(() => this.eventEmitter)
  }
}
