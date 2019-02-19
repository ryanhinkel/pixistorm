/**
 * https://stackoverflow.com/questions/47098643/implementing-a-type-safe-service-registry-in-typescript
 */
export class ECS<T> {
    constructor() {}

    public components: T = {} as any;

    public registerComponent<A extends string, B>(componentName: A, componentInstance: B): ECS<Record<A, Array<B>> & T> {
      (this.components as any)[componentName] = new Array<B>();
      return this as any as ECS<Record<A, Array<B>> & T>;
    }
}