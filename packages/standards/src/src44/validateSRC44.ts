/**
 * Copyright (c) 2022 Signum Network
 */
// based on the json schema
// we do not use a schema validator yet, as we have problems with dependencies, i.e. ajv
// for sake of simplicity we validate "manually" according the json-schema

import {SRC44Profile} from './typings';
import {SRC44ValidationException} from './exceptions';
import {parseIpfsMedia} from './parseIpfsMedia';

/**
 *
 * Validates JSON structure for SRC44 compliance
 *
 * @internal
 * @param json
 * @module standards.SRC44
 */
export function validateSRC44(json: SRC44Profile) {
    const MaxLength = 1000;
    const DsLength = 384;
    const NmLength = 24;
    const HpLength = 128;
    const ScItemLength = 3;
    const ScItemUrlLength = 92;
    const AllowedTypes = ['hum', 'smc', 'biz', 'cex', 'dex', 'oth'];
    try {
        if (json.vs !== 1) {
            throw new Error(`vs is required and must be 1 - Got ${json.vs}`);
        }

        if (!json.nm || json.nm.length > NmLength) {
            throw new Error(`nm is required and must be at maximum ${NmLength} bytes - Got ${json.nm}`);
        }

        if (json.ds && json.ds.length > DsLength) {
            throw new Error(`ds must be at maximum ${DsLength} bytes - Got ${json.ds.length}`);
        }

        if (json.hp && json.hp.length > HpLength) {
            throw new Error(`hp must be at maximum ${HpLength} bytes - Got ${json.hp.length}`);
        }

        if (json.al && !/^\w{1,100}$/.test(json.al)) {
            throw new Error(`al must match /^\\w{1,100}$/ - Got ${json.al}`);
        }

        // xt is just a IPFS CID string
        // sr is just a regex string

        if (json.tp && AllowedTypes.indexOf(json.tp) < 0) {
            throw new Error(`tp must be one of [${AllowedTypes.join(',')}] - Got ${json.tp}`);
        }

        if (json.av) {
            parseIpfsMedia(json.av);
        }

        if (json.bg) {
            parseIpfsMedia(json.bg);
        }

        if (json.sc) {
            if (json.sc.length > ScItemLength) {
                throw new Error(`sc must be at maximum ${ScItemLength} items - Got ${json.sc.length}`);
            }
            json.sc.forEach(url => {
                if (url.length > ScItemUrlLength) {
                    throw new Error(`sc URL must be at maximum ${ScItemUrlLength} characters - Got ${url.length} for [${url}]`);
                }
            });
        }

        const length = JSON.stringify(json).length;
        if (length > MaxLength) {
            throw new Error(`Maximum length of ${MaxLength} bytes allowed - Got ${length}`);
        }

        // @ts-ignore
    } catch (e: any) {
        throw new SRC44ValidationException(e.message);
    }

}