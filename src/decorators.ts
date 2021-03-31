import { setMetadata } from '@smoothjs/smooth'
import { OnOptions } from "eventemitter2";
import { OnEventMetadata } from "./interfaces";

export function OnEvent(
    event: string | symbol | Array<string | symbol>,
    options?: OnOptions,
): MethodDecorator {
    return (target: any, key?: string | symbol) => {
        setMetadata('EVENT_LISTENER_METADATA', target, { event, options } as OnEventMetadata, key)
    }
};