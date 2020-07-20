export const Config = {
    Title: `Dinemate App`,
    BaseUrl: window.location.host.includes("localhost") ? "http://127.0.0.1:8000/api" : `${window.location.origin}/api`,
    urlbase: window.location.host.includes("localhost") ? "http://127.0.0.1:8000" : window.location.origin,
    qr_url: `${window.location.origin}/customer-dine`
}

