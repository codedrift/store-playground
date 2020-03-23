# store-playground

## Usage

1. Use the provided docker-compose files to start a backing store
2. change the store implementation to the desired one in `index.ts`
3. in case of cassandra run `setup-store.sh` to create keyspace and tables
4. run `write-and-read.sh` to perform a write and a read operation
5. ???
6. Profit