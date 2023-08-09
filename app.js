const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const app = express();

const {spawn} = require('child_process');


// app.set("view-engine", "ejs");
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // console.log('video received successfully..')
        // client.send(message.toString());

        let dataToSendToPythonScript =  'req.file';
        // console.log(dataToSendToPythonScript)
        var detect;

        const python = spawn('python', ['suma.py' , message.toString() ]);

        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            dataToSend = data.toString();
            console.log(dataToSend)
            // let result = dataToSend.match(/\[\s*'([^']*)'\s*\]/)[1];
            // detect = result
            // console.log(result);
            // console.log(result.length);

        });

        python.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        python.on('close', (code) => {
            // console.log(`child process close all stdio with code ${code , detect}`);
            // res.setHeader('Content-Disposition', `${detect}`);
            // res.sendFile(filePath)
        });

      }
    });
  });
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});
