FROM openjdk:17

LABEL maintainer="Marek"

ADD backend/target/youLearners.jar youLearners.jar

CMD [ "sh", "-c", "java -DServer.port=$PORT -jar /youLearners.jar"]