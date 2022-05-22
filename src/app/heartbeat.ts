import { CeleryBroker } from "../kombu/brokers";
import * as os from 'os';

export class Heartbeat {
  private exchange = "celeryev";
  private sw_ident = "celery.node";
  private sw_ver = "0.5.8";
  private sw_sys = process.platform;
  private handle;

  constructor(
    private broker: CeleryBroker,
    private hostname?: string,
    private freq = 2.0
  ) {
    if (!this.hostname) {
      this.hostname = os.hostname();
    }

    this.sendEvent("worker-online");
    this.handle = setInterval(() => {
      this.sendEvent("worker-heartbeat");
    }, freq * 1000.0);
  }

  public stop() {
    if (this.handle) clearInterval(this.handle);
    this.sendEvent("worker-offline");
  }

  public sendEvent(
    type: string,
    active = 0,
    processed = 0,
    loadavg = [0, 0, 0]
  ) {
    const date = new Date();
    const body = {
      type,
      hostname: this.hostname,
      utcoffset: date.getTimezoneOffset() / 60.0,
      pid: 0,
      clock: 1,
      freq: this.freq,
      active,
      processed,
      loadavg,
      sw_ident: this.sw_ident,
      sw_ver: this.sw_ver,
      sw_sys: this.sw_sys,
      timestamp: date.getTime() / 1000.0
    };

    const properties = {
      routing_key: type.replace("-", "."),
      exchange: this.exchange
    };

    this.broker.publish(body, this.exchange, this.exchange, {}, properties);
  }
}
