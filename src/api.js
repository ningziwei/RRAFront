import reqwest from "reqwest";
import {serverURL} from "./config";

function wrapUrl(url, randParam = true) {
    let trueURL = serverURL + url;
    if (randParam)
        trueURL += '?time=' + (new Date().getTime());
    return trueURL;
}

function postData(url, data, callback) {
    reqwest({
        url: wrapUrl(url),
        method: 'post',
        type: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: callback,
        error: callback,
        // success: (d) => callback(d.response),
        // error: (d) => callback(d.response),
    })
}

function getData(url, callback, data = {}) {
    reqwest({
        url: wrapUrl(url),
        type: 'json',
        method: 'get',
        data: data,
        contentType: 'application/json',
        success: callback,
    });
}

export function getAnswer(messageList, callback) {
    // getData('getAnswer', callback, JSON.stringify(messageList));
    postData('getAnswer', messageList, callback);
}

export function resetRobot(callback) {
    postData('resetRobot', "",callback);
}

export function getBugs(callback) {
    getData('getBugs', d => callback([d]));
}

export function getBugDetail(bugKey, callback) {
    getData('getBugDetail', callback, {bugKey});
}

// 检索接口
export function getRetrival(messageList, callback) {
    // getData('getAnswer', callback, JSON.stringify(messageList));
    postData('retrival', messageList, callback);
}
// 问答接口
export function getAnswerAndGraph(messageList, callback) {
    postData('answer', messageList, callback);
}
// 推理接口
export function getReasAndGraph(messageList, callback) {
    postData('find_path', messageList, callback);
}