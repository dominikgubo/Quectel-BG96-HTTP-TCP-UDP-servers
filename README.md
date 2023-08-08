

# About Project

Server configuration for catching HTTP requests, TCP and UDP messages using Quectel BG96 (and other similar Quectel models)

## UDP

Locate yourself to the UDP server directory, and run the server with ./servers.sh
```
./servers.sh <port_number>
```

### Configure network (NB-IoT)
In my case i will configure NB-IoT network (although for Quectel BG96 you can use LTE-CAT M1 also). This is my configuration.

| AT Command      | Order          
| ------------- |:-------------:|
| AT+CFUN=0     | 1 |
| AT+CMEE=2   | 2     |
| AT+QCFG="nwscanseq",03,1 | 3     |
| AT+QCFG="nwscanmode",3,1      | 4 |
| AT+QCFG="iotopmode",1,1    | 5      |
| AT+QCFG="band",0,0,<freq band>,1 | 6     |
| AT+QCFG="servicedomain",1,1     | 7 |
| AT+CEREG=2     | 8
| AT+QICSGP=1,1,"<APN>","","",1 |     9 |
| AT+CFUN=1 | 10    |
| AT+QIOPEN=1,0,"UDP","<ip address>",<port number> |     11 |
| AT+QISENDEX=0,"4d6573736167652031",2 |     12 |
| AT+QICLOSE=0,2 |     13 |

AT+QISENDEX sends messages in hex format, "4d6573736167652031" = Message 1

I will add explanation for each command and thought process, but for now In Quectel AT command manual there is explanation for each AT command (with examples depending on which AT command manual you are looking).

If you configured server and module correctly, you should see message on the server side.

![Message on server](https://i.imgur.com/a4V2na5.png)


## TCP

Same as UDP but you need to locate yourself into TCP folder (in server code) and AT+QIOPEN command is different; 

```AT+QIOPEN=1,0,"TCP","<ip address>",<port number>```


## HTTP

HTTP is a bit more complicated than TCP/UDP, HTTPS even more so. 

Install node.js (server is on node), then locate yourself into HTTP folder and run server;
```
./servers.sh 
```
Port is set to "9696" which you can easily change inside server.js file. 
Inside file - server.js there is GET and POST HTTP route for experimenting. GET returns example of sensor data.  

Frequent HTTP errors: 
- HTTP/S DNS – incorrect server (or entry of network address) for individual HTTP requests 
- HTTP/S timeout – insufficient time to execute the request 
- HTTP/S socket close – the server is not started (or it was shut down during the request)
- HTTP/S busy – sending other requests until the original one has expired

Refer to HTTP(S) AT command manual till I finish this section. 

## TCP/UDP/HTTP error memo
In many cases module configuration is not causing errors but a correct network configuration is a problem of it's own. 
Common errors:

- incorrectly set port number
- incorrectly formatted message (hexadecimal, character string type)
- incorrect content of the AT command (missing quotation marks, loss of the correct format of the command eg. by running via serial library AT commands  within Python, C++)
- frequently sending AT commands without a time gap to finish sent command
- incorrectly configured server
- incorrect configuration of network (and other) settings on the Quectel BG96 development environment









