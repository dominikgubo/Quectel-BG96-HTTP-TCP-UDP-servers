
PORT="$1"

echo "Starting TCP server and listening on $1"

netcat -l -k $1
