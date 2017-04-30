/**
 * Cachet-mastodon-stats
 * Author: Michael Vieira <contact+dev[at]mvieira[dot]fr>
 * License: MIT
 */

// Require all dependencies
var request = require("request");
var cheerio = require("cheerio");
var config  = require("./config");


// getData function
var getData = function(instance, callback) {
    request(instance, (err, data, response) => {
        if(err) callback("Something was wrong with the instance request", null);
        else {
            var $ = cheerio.load(data.body);

            // Check if is Mastodon instance (by getting the source code link)
            if($("a[href='https://github.com/tootsuite/mastodon']").text() == "") callback("Have you called the about/more page of the mastodon instance?", null);
            else {
                var data = $(".section strong");
                callback(null, {
                    users: parseInt($(data[0]).text().replace(",", "")),
                    posts: parseInt($(data[1]).text().replace(",", "")),
                    connected_instances: parseInt($(data[2]).text().replace(",", ""))
                });
            }
        }
    });
}


// Users metric
if(config.users.enabled == true) {
    getData(config.general.instance_about_uri, (err, data) => {
        if(err) throw err;

        var options = {
            method: "POST",
            url: config.general.cachet_uri + "api/v1/metrics/" + config.users.metric_id + "/points",
            headers: { "X-Cachet-Token": config.general.api_token },
            body: { value: data.users },
            json: true
        };

        request(options, function (err, res, body) {
            if (err) throw new Error(err);

            console.log("Users metric point added");
        });
    });
}


// Posts metric
if(config.posts.enabled == true) {
    getData(config.general.instance_about_uri, (err, data) => {
        if(err) throw err;

        var options = {
            method: "POST",
            url: config.general.cachet_uri + "api/v1/metrics/" + config.posts.metric_id + "/points",
            headers: { "X-Cachet-Token": config.general.api_token },
            body: { value: data.posts },
            json: true
        };

        request(options, function (err, res, body) {
            if (err) throw new Error(err);

            console.log("Posts metric point added");
        });
    });
}


// Connected instances metric
if(config.instances.enabled == true) {
    getData(config.general.instance_about_uri, (err, data) => {
        if(err) throw err;

        var options = {
            method: "POST",
            url: config.general.cachet_uri + "api/v1/metrics/" + config.instances.metric_id + "/points",
            headers: { "X-Cachet-Token": config.general.api_token },
            body: { value: data.connected_instances },
            json: true
        };

        request(options, function (err, res, body) {
            if (err) throw new Error(err);

            console.log("Connected instances metric point added");
        });
    });
}