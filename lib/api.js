'use strict'

const fetch = require('node-fetch')
const config = require('../config')
const appId = config.baas.APPID
const host = config.baas.HOST

const Api = {
  queryRecords(tableName, query) {
    let baseUrl = `${host}/tables/${tableName}?appId=${appId}`;
    if (query) {
      baseUrl = `${baseUrl}&query=${encodeURIComponent(JSON.stringify(query))}`
    }
    return fetch(baseUrl).then(res => res.json())
  },
  queryRecord (tableName, _id) {
    return fetch(`${host}/tables/${tableNAme}/${_id}/?appId=${appId}`).then(res => res.json())
  },
  createRecord (tableName, data) {
    const body = {
      body: data
    }
    return fetch(`${host}/tables/${tableName}?appId=${appId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
  },
  createRecords (tableName, data) {
    const body = {
      body: data
    }
    return fetch(`${host}/tables/${tableName}?appId=${appId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
  },
  updateRecords(tableName, ids, data) {
    let baseUrl = `${host}/tables/${tableName}`;

    const body = {
      body: data
    };

    if (Array.isArray(ids)) {
      body.ids = ids;
      baseUrl += '/batch';
    } else {
      baseUrl += `/${ids}`;
    }

    baseUrl += `?appId=${appId}`;

    return fetch(baseUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json());
  },
  deleteRecords (tableName) {
    return fetch(`${host}/tables/${tableName}/batch?appId=${appId}`, {
      method: 'DELETE'
    }).then(res => res.json())
  },
  invoke (functionName, data) {
    fetch(`http://ekitchen.alpha.zoo.elenet.me/invk/crawler_github-alpha-crawler_github/${functionName}`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}

module.exports = Api
