![image](https://github.com/juuso-vaadin/theme-development-starter/assets/19607782/a753aad5-8f41-4290-ae02-137c51b97b24)


# Vaadin theme development starter

This project is a multi-module Vaadin + Spring Boot project. It uses Vaadin 24 and Java 17.

Project consists of two modules:

<ul>
  <li><strong>theme</strong>: Includes CSS files included in a JAR package</li>
  <li><strong>demo</strong>: Runnable Vaadin 24 application with a component sample UI</li>
</ul>

## Running the project

From the root directory, run
```terminal
mvn install
```

Install will generate a new JAR file from the styles in **theme** project.

then to start the project, run
```terminal
mvn spring-boot:run -pl demo
```

The application will be accessible in http://localhost:8080.

## Developing a theme

Changes in **theme** project are automatically loaded without need to restart the project (`vaadin.frontend.hotdeploy=true`).

Note that the JAR package is only generated when `mvn install` is run.
