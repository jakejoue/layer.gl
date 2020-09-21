'use strict';

mapboxgl.accessToken = getAccessToken();

function getAccessToken() {
    var accessToken = (
        'pk.eyJ1IjoiamFrZWpvdWUiLCJhIjoiY2p2M2dneXJ3MTI3ZjQzcDkwcTk0azg3ZyJ9.KpuPwDUSsQKf2Qs7mu7bww' ||
        'pk.eyJ1IjoiamFrZWpvdWUiLCJhIjoiY2pucGdkOWp2MmpoczNwbzNhaHBtdTZnOSJ9.tJ_ElJXH5IntAzEVKGu3Ag' ||
        getURLParameter('access_token') ||
        localStorage.getItem('accessToken')
    );
    try {
        localStorage.setItem('accessToken', accessToken);
    } catch (_) {}
    return accessToken;
}

function getURLParameter(name) {
    var regexp = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
    var output = regexp.exec(window.location.href);
    return output && output[1];
}
