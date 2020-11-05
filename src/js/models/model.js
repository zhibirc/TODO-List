/**
 * @overview Basic application model of REST interactions.
 *
 * @module
 */

import config from '../config.js';

const RESOURCE_TYPE_PROJECT = Symbol('RESOURCE_TYPE_PROJECT');
const RESOURCE_TYPE_TODO    = Symbol('RESOURCE_TYPE_TODO');

export default class Model {
    constructor ( config = {} ) {
        Object.assign(this, config);
    }

    static get RESOURCE_TYPE_PROJECT () {
        return RESOURCE_TYPE_PROJECT;
    }

    static get RESOURCE_TYPE_TODO () {
        return RESOURCE_TYPE_TODO;
    }

    remove ( resourceType, id ) {
        const resource = resourceType === Model.RESOURCE_TYPE_PROJECT ? 'Project' : 'Task';

        return new Promise((resolve, reject) => {
            fetch(`${config.API_BASE_PATH_URL}/delete${resource}/${id}`, {method: 'DELETE'})
                .then(async response => {
                    if ( response.status >= 400 ) {
                        throw new Error((await response.json()).code);
                    }

                    return response;
                })
                .catch(error => console.error(error) && reject(error));
        });
    }

    update ( resourceType, data ) {
        const resource = resourceType === Model.RESOURCE_TYPE_PROJECT ? 'Project' : 'Task';

        return new Promise((resolve, reject) => {
            fetch(`${config.API_BASE_PATH_URL}/update${resource}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }})
                .then(async response => {
                    if ( response.status >= 400 ) {
                        throw new Error((await response.json()).code);
                    }

                    Object.assign(this, data);

                    return response.json();
                })
                .catch(error => console.error(error) && reject(error));
        });
    }

    create ( resourceType, data ) {
        const resource = resourceType === Model.RESOURCE_TYPE_PROJECT ? 'Project' : 'Task';

        return new Promise((resolve, reject) => {
            fetch(`${config.API_BASE_PATH_URL}/add${resource}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }})
                .then(async response => {
                    if ( response.status >= 400 ) {
                        throw new Error((await response.json()).code);
                    }

                    return response.json();
                })
                .catch(error => console.error(error) && reject(error));
        });
    }

    static findAll () {
        return new Promise((resolve, reject) => {
            fetch(`${config.API_BASE_PATH_URL}/`, {method: 'GET'})
                .then(async response => {
                    if ( response.status >= 400 ) {
                        throw new Error((await response.json()).code);
                    }

                    return response.json();
                })
                .catch(error => console.error(error) && reject(error));
        });
    }
}