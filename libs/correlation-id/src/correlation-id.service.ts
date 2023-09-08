import { Injectable } from '@nestjs/common';

import { createHook, executionAsyncId } from "async_hooks";

let data = new Map();

createHook({
  init(asyncId, _type, triggerAsyncId, _resource) {
    if (data.has(triggerAsyncId)) data.set(asyncId, data.get(triggerAsyncId));
  },
  destroy(asyncId) {
    data.delete(asyncId);
  },
}).enable();

@Injectable()
export class CorrelationIdService {
  public start(id: string): void {
    const executionId = executionAsyncId();
    data.set(executionId, id);
  }

  public getCID(): string {
    const executionId = executionAsyncId();
    const correlationId = data.get(executionId);
    return correlationId;
  }
}
