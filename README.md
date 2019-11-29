# Start IPFS
Data Repo klonen

Dann Pfad auf die beiden Ordner im Repo angeben:
export ipfs_data=<pfad>/DataMoney/ipfs/data
export ipfs_staging=<pfad>/DataMoney/ipfs/staging
docker run -d --name ipfs_host -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 5001:5001 -p 127.0.0.1:8080:8080 ipfs/go-ipfs:latest


https://docs.ipfs.io/reference/api/http/
