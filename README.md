# Cachet Mastodon stats
Show the stats of your mastodon instance directly on Cachet

# Prerequisites
 * NodeJS
 * Cron (Linux/Unix) or Task scheduler (Windows)

# Configuration
First, clone with repository
```
git clone https://github.com/themimitoof/cachet-mastodon-stats.git
```

Download all dependencies with: 
```
npm i
```

Rename the ```config.js.sample``` in ```config.js``` file and edit informations:
```
var config = {
    general: {
        cachet_uri: "https://status.themimitoof.fr/", // Here is the URI to your Cachet instance
        api_token: "", // Here is the API token (available in your Cachet profile)
        instance_about_uri: "https://masto.themimitoof.fr/about/more" // Here is the URI to the about/more page of your Mastodon instance
    },
    users: {
        enabled: true,
        metric_id: 1 // Here is the ID of the metric graph
    },
    posts: {
        enabled: true,
        metric_id: 2 // Here is the ID of the metric graph
    },
    instances: {
        enabled: true,
        metric_id: 3 // Here is the ID of the metric graph
    }
}
``` 

To try if your settings is OK, launch the code with: 
```
node index.js
```

Finally, create _cron task_ (or _scheduled task (on Windows))_. Cron examples:
```
# Run task every 30 minutes
0/30 * * * * node /opt/cachet-mastodon-stats/index.js

# Or

# Run task every hour
0 * * * * node /opt/cachet-mastodon-stats/index.js
```

# Cachet metric template
__Note :__ Before adding metric, please ensure the timezone in your ```php.ini``` and on _Cachet settings_ is right.

Here is my recommended configuration for metrics charts:
 * _Calculation of metrics_: Average
 * _Default view_: ~~Last 12 Hours _or_~~ (I have some problems with this view) Week
 * _Default value_: 0
 * _Decimal places_: 0
 * _How many minutes of threshold between metric points?_: 0
