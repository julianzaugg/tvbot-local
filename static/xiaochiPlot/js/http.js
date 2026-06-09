// LOCAL STUB for /static/xiaochiPlot/js/http.js
// Exports the Http class that mainplot.min.js instantiates as this.http

export class Http {
  constructor() {
    console.log("[tvbot-local] Running in local mode — cloud save/load disabled");
  }

  get(url, params) {
    console.warn("[tvbot-local] Http.get (no-op):", url);
    return Promise.resolve({ code: 0, data: [], msg: "local mode" });
  }

  post(url, data) {
    console.warn("[tvbot-local] Http.post (no-op):", url);
    return Promise.resolve({ code: 0, data: null, msg: "local mode" });
  }

  // Catch-all for any method the app calls on this.http
  // that we haven't explicitly stubbed above
}

// Also patch out the visit counter that mainplot calls directly
// (it calls this.getUserFigureData on the MainPlot class itself,
//  which in turn likely delegates to this.http.get — the above covers it)

export default Http;
