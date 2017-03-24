# AWS-VoltDB
## Manual process of running a VoltDB instance in EC2 and running a query against it
1. Start an EC2 instance running Ubuntu
2. SSH into the instance
3. Run the following commands to install VoltDB and run a DB instance:
    - wget http://downloads.voltdb.com/technologies/server/voltdb-ent-latest.tar.gz
    - tar -xzf voltdb-ent-*.tar.gz
    - cd voltdb-ent-7.0
    - sudo apt-get install python
    - sudo apt-get update
    - sudo bash -c "echo never > /sys/kernel/mm/transparent_hugepage/enabled"
    - sudo bash -c "echo never > /sys/kernel/mm/transparent_hugepage/defrag"
    - apt install openjdk-8-jre-headless
    - file /etc/alternatives/java
    - file /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
    - export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"
    - export PATH=$PATH:$JAVA_HOME
    - export PATH=$PATH:$(pwd)/bin
    - voltdb init
    - sudo voltdb start
4. SSH into the AWS instance from another terminal instance
5. Run "sqlcmd" to connect to VoltDB SQL interface
6. To create a table, run something like:
    - CREATE TABLE towns (town VARCHAR(64), county VARCHAR(64),state VARCHAR(2));
    - insert into towns values ('Billerica','Middlesex','MA');
7. To query from the VoltDB instance you must:
     - create a stored procedure through the "sqlcmd" interface with name [proc name]
     - send an HTTP get request to the AWS instance using the following address template:
        - 'http://[aws instance public address]:8080/api/1.0/?Procedure=[proc name]'
     - test_script.js is an example of how to do the above
