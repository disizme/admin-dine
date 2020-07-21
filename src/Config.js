export const Config = {
    Title: `Dinemate App`,
    BaseUrl: window.location.host.includes("localhost") ? "http://127.0.0.1:8000/api" : `http://api.dinemate.com.au/api`,
    urlbase: window.location.host.includes("localhost") ? "http://127.0.0.1:8000" : "http://api.dinemate.com.au/", 
    qr_url: `http://admin.dinemate.com.au/customer-dine`
}

