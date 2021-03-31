import { OnOptions } from 'eventemitter2';

export interface OnEventMetadata {
    event: string | symbol | Array<string | symbol>;
    options?: OnOptions;
}