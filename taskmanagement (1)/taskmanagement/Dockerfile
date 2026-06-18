# Step 1: Use a standard Maven image to compile the backend code
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy your source code into the builder container
COPY . .

# Compile and package your code into a clean production .jar file
RUN mvn clean package -DskipTests

# Step 2: Use a lightweight Java runtime environment for running the app
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Safely copy over the compiled .jar file from Step 1
COPY --from=build /app/target/*.jar app.jar

# Open up port 8080 for web traffic
EXPOSE 8080

# Boot up your Spring Boot application automatically
ENTRYPOINT ["java", "-jar", "app.jar"]