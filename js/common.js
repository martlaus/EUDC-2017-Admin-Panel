// var API_URL = 'http://188.166.104.203:7070/rest';
var API_URL = 'http://localhost:7070/rest';
var TOKEN_COOKIE_NAME = 'eudc-admin-token';
var EMAIL_COOKIE_NAME = 'user-email';

var userSettings = {
    token: getCookie(TOKEN_COOKIE_NAME) || '',
    user: {
        email: getCookie(EMAIL_COOKIE_NAME) || ''
    }
};

$(document).ready(function () {
    if (window.location.pathname != '/' && !userSettings.token) {
        window.location.href = '/';
    }
});

function makeCall(url, method, params, includeAuthentication, successCallback, errorCallback, finallyCallback, transformRequest) {
    var headers = {};

    if (includeAuthentication) {
        headers = setAuthorization(headers);
    }

    $.ajax({
        url: API_URL + url,
        headers: headers,
        method: method,
        data: params,
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            successCallback(data);
        },
        error: function (data, status) {
            if (status == '419') {
                clearAuth();
                makeCall(url, method, params, false, successCallback, errorCallback, finallyCallback, transformRequest);
            } else if (status == '401') {
                window.location.href = '/';
            } else {
                errorCallback(data, status);
            }
        },
        end: function () {
            finallyCallback();
        }
    });
}

function setAuthorization(headers) {
    if (userSettings.token && userSettings.user.email) {
        var user = userSettings.user;
        headers.Token = userSettings.token;
        headers.Email = user.email;
    }

    return headers;
}

function clearAuth() {
    userSettings.token = userSettings.user.email = '';
    clearCookie(TOKEN_COOKIE_NAME);
    clearCookie(EMAIL_COOKIE_NAME);
}

function setAuth(token, email) {
    userSettings.token = token;
    userSettings.user.email = email;
    setCookie(TOKEN_COOKIE_NAME, token);
    setCookie(EMAIL_COOKIE_NAME, email);
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function clearCookie(key) {
    setCookie(key, '');
}