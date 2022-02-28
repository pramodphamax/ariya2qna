// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const fetch = require('node-fetch');

class MicrosoftTranslator {
    constructor(translatorKey) {
        this.key = translatorKey;
    }

    /**
   * Helper method to translate text to a specified language.
   * @param {string} text Text that will be translated
   * @param {string} targetLocale Two character language code, e.g. "en", "es"
   */
    async translate(text, targetLocale) {
        // From Microsoft Text Translator API docs;
        // https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-nodejs-translate
        const host = 'https://api.deepl.com/v2/translate';
        const path = '/translate?api-version=3.0';
        const params = '&to=';

        const url = "https://api.deepl.com/v2/translate";

        var details = {
            'auth_key': '8c19d41c-6e66-91da-286f-31b551da4cb9',
            'text': text,
            'target_lang': targetLocale.toUpperCase(),
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var res = await fetch(url, {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!res.ok) {
            throw new Error('Call to translation services failed.');
        }

        var responseBody = await res.json();

        if (responseBody && responseBody.translations.length
            > 0) {
            return responseBody.translations[0].text;
        } else {
            return text;
        }
        return text;
    }
}

module.exports.MicrosoftTranslator = MicrosoftTranslator;
