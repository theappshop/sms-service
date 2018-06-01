# Application to send SMS via Twillio service.
### TODO
- Brute force protect
means it will possible to send message to one number not more often than in a certain period. Env setup should be provided.
- Validate number endpoint
- Webhook endpoint for Twilio
- history url
it could be REST GET endpoint or graphql
- UI for managing numbers (for huge amount of message > 250 per day)

### Description
Sms-service used postgres and redis to store data.
Application saves history of all SMS which was sent or felt.
Format and validate message is available.
Also guard against brute force in development.

### Dependencies
Databases required to provide service working:

- PostgreSQL
- Redis   

It should running local, inside another Docker container, or on external server.
For postgres you should create DB.
If you have postgres and redis running you should provide HOST name, PORT and other data to connect in environment.
Details about environment are below.
Also you should have Twilio account.

### Twilio
For sending message you should have Twilio account. You should provide your account SID and SECRET key to make service working. Also number required.

### All available environment
``` NODE_ENV ``` (default: 'development')  
``` PORT ``` (default: 80)   
``` PG_DB ```  
``` PG_USER ```  
``` PG_PASSWORD ```  
``` PG_HOST ``` (default: 'localhost')  
``` PG_PORT ``` (default: '5432')  
``` REDIS_HOST ``` (default: 'localhost')  
``` REDIS_PORT ``` (default: '6379')  
``` REDIS_PASSWORD ```  
``` TW_SID ```  
``` TW_TOKEN ```  
``` TW_NUMBER ```

### commands to start
``` npm run db:migrate:prod ``` - reinitialize DB (drop and recreate)   
``` npm run db:start:prod ``` - initialize DB (just create)  
``` npm run start:prod ``` - start server  

To make service working you should make first start with ``` npm run db:start:prod ``` command to initialize DB, after that you should restart container with ```npm run start:prod``` command to make service running.
If you want reinitialize your DB npm run db:migrate:prod command available.

### logs
``` sudo docker exec -it [ID] tail -f logs/info.log ```   
``` sudo docker exec -it [ID] tail -f logs/error.log ```    
[ID] - id or name container

### github
[Github Repo](https://github.com/AppDevelopmentShop/sms-service/)

### swaggerhub
[Swagger API Documentation](https://app.swaggerhub.com/apis/vaiol/sms-service/)

### docker-compose
Example part of valid docker compose file for sms service:

```
sms-service:
    image: appshop/sms-service
    depends_on:
      - postgres
      - redis
    environment:
      NODE_ENV: production
      PG_DB: db_name
      PG_USER: user
      PG_PASSWORD: 12345678
      PG_HOST: postgres
      REDIS_HOST: redis
      TW_SID: AC5488852a6a3b420275745ccd4c7c33a9
      TW_TOKEN: 7g397g23a3eg0e9a38ef08faa94a4g0a
      TW_NUMBER: +14444444444
    command:
      ["npm", "run", "start:prod"]
    networks:
      - network
```
