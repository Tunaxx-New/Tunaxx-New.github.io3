var fs = require('fs');

function addUser(login, password, group) {
    fs.readFile("./users.json", "utf-8", (e, jsonString) => {
        if (e) {
            console.log("Failed to load users.json");
        } else {
            try {
                data = JSON.parse(jsonString);

                //...
                const id = (data.idSize + 1);
                data.users.push({"id": id,"login": login, "password": password,"IP": "", "group": group, "time": []});

                var write = JSON.stringify(data, null, '\t')
                write = write + '1';
                fs.writeFile('./users.json', write, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file')
                    }
                });
            } catch(e) {
                console.log(e);
            }
        }
    });
}
addUser();