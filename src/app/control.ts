
export class Control
{
  constructor(private broker) {
  }

  private _handleMessage(message) {
    console.log(message.method);
    switch (message.method) {
      // Inspect
      case 'active': return this.active(message);
      case 'active_queues': return this.active_queues(message);
      case 'clock': return;
      case 'conf': return this.conf(message);
      case 'hello': return;
      case 'memdump': return;
      case 'memsample': return;
      case 'objgraph': return;      
      case 'ping': return;
      case 'query_task': return;
      case 'report': return;
      case 'registered': return this.registered(message);
      case 'reserved': return this.reserved(message);
      case 'revoked': return this.revoked(message);
      case 'scheduled': return this.scheduled(message);
      case 'stats': return this.stats(message);

      // Control
      case 'add_consumer': return;
      case 'autoscale': return;
      case 'cancel_consumer': return;
      case 'disable_events': return;
      case 'election': return;
      case 'enable_events': return { 'ok': 'events enabled' };
      case 'heartbeat': return;
      case 'pool_grow': return;
      case 'pool_restart': return;
      case 'pool_shrink': return;
      case 'rate_limit': return;
      case 'revoke': return;
      case 'shutdown': return;
      case 'terminate': return;
      case 'time_limit': return;

      default: console.error(`Unable to handle message '${message}'`);
    }
  }

  public handleMessage(message) {
    const properties = {};
    const body = this._handleMessage(message);

    if (message.reply_to) {
      this.broker.publish(body, message.reply_to.exchange, message.reply_to.routing_key, {}, properties);
    }
  }

  private conf(message) {
    return { 'Desktop': JSON.stringify({ 'key': 'value' }) as any };
  }

  private registered(message) {
    // TaskInfo -- all fields as string
    return [];
  }
  
  private stats(message) {
    return {};
  }
  
  private scheduled(message) {
    return [];
  }
  
  private revoked(message) {
    return [];
  }

  private active_queues(message) {
    return [];
  }

  private reserved(message) {
    return [];
  }

  private active(message) {
    return [];
  }
}
