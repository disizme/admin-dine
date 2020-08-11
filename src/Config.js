export const Config = {
    Title: `Dinemate App`,
    BaseUrl: window.location.host.includes("localhost") ? "http://127.0.0.1:8000/api" : `https://api.dinemate.com.au/api`,
    urlbase: window.location.host.includes("localhost") ? "http://127.0.0.1:8000/media/" : "https://api.dinemate.com.au/media/", 
    // BaseUrl: `https://api.dinemate.com.au/api`,
    // urlbase: `https://api.dinemate.com.au/media/`,
    // qr_url: window.location.host.includes("localhost") ? "http://localhost:2001" : "https://customer.dinemate.com.au", 
    qr_url: `https://customer.dinemate.com.au`,
    stripe_key: "pk_test_51HBlcaDLisZAJjrz6r7rznsMHgFuSNmko1gx2aFY8BQSNlmcoRnihLYV4IiNLCuBjiLGsOQWqqGNOK8XIgQqEjAF00u7JqukaV"
}

