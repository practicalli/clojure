# Load Testing

The [Gatling](https://github.com/mhjort/clj-gatling) project can be used to create and run load tests using Clojure (and get fancy reports).

Add the following to your project.clj :dependencies

```
[clj-gatling "0.11.0"]
```


## Describe a Load Test

This is how we would write a simple load test which performs 50 GET requests against a server running at test.com:

```
class SimpleSimulation extends Simulation {
  //declare a scenario with a simple get request performed 5 times
  val scn = scenario("myScenario")
            .exec(http("myRequest").get("http://test.com/page.html"))
            .repeat(5)

  //run the scenario with 10 concurrent users
  setUp(scn.users(10))
}
```

Gatling refers to load tests as Simulations which have one or more Scenarios. In the one above we are saying we will have 10 users execute 5 requests each in parallel. We could provide a Content-Type header with the request and check for a 200 response code like this:


```
http("myRequest")
  .get("http://test.com/page.html")
  .header("Content-Type", "text/html")
  .check(status.is(200))
If we wanted to do a POST request with a JSON body and basic authentication, as well as verify something in the response:

http("myRequest")
  .post("http://test.com/someresource"))
  .body(StringBody("""{ "myContent": "myValue" }"""))
  .asJSON
  .basicAuth("username", "password")
  .check(jsonPath("$..someField").is("some value"))
```

The expression used to extract someField from the response is passed to jsonPath() and is based on Goessner’s JsonPath syntax. We use is() to verify the expected value is equal to some value. We can also do other forms of verification on the response json like:

* not(expectedValue): not equal to expectedValue
* in(sequence): to check that a value belongs to the given sequence
* exists(), notExists(): to check for the presence/absence of a field

For a multipart request with 2 parts and gzip compression:

```
http("myRequest")
  .post("http://test.com/someresource"))
  .bodyPart(StringBodyPart("""{ "myContent": "myValue" }"""))
  .bodyPart(RawFileBodyPart("file", "test.txt")
  .processRequestBody(gzipBody)
We can also create scenarios with multiple requests and use the result from previous requests in subsequent requests like this:

scenario("myScenario")
  .exec(http("request1")
          .post("http://test.com/resource1")
          .body(StringBody"""{ "myContent": ""}""")
          .check(jsonPath("$..myResponse.guid").saveAs("guid")))
  .exec(http("request2")
          .put("http://test.com/resource2/${guid}")
          .body(StringBody"""{ "someOtherField": ""}"""))
```

guid is extracted from the response of the first call using saveAs("guid") and used in the path to the PUT call.

Scenarios can also be run with a ramp up. If we wanted to run the scenario above with 1000 users with a ramp up of 20 seconds we would do:

```
setUp(scn.users(1000).ramp(20))
```


## Run a Simulation

There are a number of ways to run Gatling simulations. You can download the bundle, place your simulations under the user-files/simulations directory and then run bin/gatling.sh.

If you prefer integration with your build system there are plugins for Maven, Gradle and SBT. For example, for Maven we just add the dependencies in the pom.xml:


```
<dependencies>
  <dependency>
    <groupId>io.gatling.highcharts</groupId>
    <artifactId>gatling-charts-highcharts</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>

<build>
   <plugins>
     <plugin>
       <groupId>io.gatling</groupId>
       <artifactId>gatling-maven-plugin</artifactId>
     </plugin>
   </plugins>
</build>
```

Place simulations under src/test/scala/com/company/service and then in the terminal:


```
mvn gatling:execute -Dgatling.simulationClass=com.company.service.YourSimulation
```
