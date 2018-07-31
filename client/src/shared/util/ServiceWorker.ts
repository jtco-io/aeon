// import * as OfflinePluginRuntime from "offline-plugin/runtime";

class ServiceWorker {
  config: {
    onInstalled: any;
    onUpdating: any;
    onUpdateReady: any;
    onUpdated: any;
  };

  constructor() {
    this.config = {
      onInstalled: this.onInstalled,
      onUpdating: this.onInstalled,
      onUpdateReady: this.onInstalled,
      onUpdated: this.onInstalled,
    };
  }

  private onInstalled(): any {
    console.log("onInstalled");
  }

  private onUpdating(): any {
    console.log("onUpdating");
  }

  private onUpdateReady(): any {
    console.log("onUpdateReady");
    // OfflinePluginRuntime.applyUpdate();
  }

  private onUpdated(): any {
    console.log("onUpdated");
    window.location.reload();
  }

  public install(): any {
    // OfflinePluginRuntime.install(this.config);
  }
}

export default ServiceWorker;
