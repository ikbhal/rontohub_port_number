const express = require('express');
const { execSync } = require('child_process');
const app = express();
const port = 3046; // Choose your desired port number

// Set EJS as the view engine
app.set('view engine', 'ejs');


app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/', (req,res)=>{
    // forward to /port
    res.redirect('/port');
});

app.get('/port', (req, res) => {
    const cmd = "sudo grep -o 'reverse_proxy localhost:[0-9]*' /etc/caddy/Caddyfile | awk -F':' '{print $NF}'| sort -rn";
    const maxPorts = execSync(cmd).toString().split('\n').filter(Boolean);

    // Render the port.ejs template and pass the ports array
    res.render('port', { ports: maxPorts });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
