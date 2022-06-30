        var days = Math.floor(client.uptime / 86400000);
        var hours = Math.floor(client.uptime / 3600000) % 24;
        var minutes = Math.floor(client.uptime / 60000) % 60;
        var seconds = Math.floor(client.uptime / 1000) % 60;