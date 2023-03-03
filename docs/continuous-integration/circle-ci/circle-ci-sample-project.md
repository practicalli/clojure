# Circle CI example project

<!-- TODO: review the CircleCI example Clojure project -->

[The Circle CI language guide for Clojure](https://circleci.com/docs/2.0/language-clojure/){target=_blank} provides an [example project](https://github.com/CircleCI-Public/circleci-demo-clojure-luminus/fork){target=_blank} that is managed by the [Leiningen build automation tool](https://leiningen.org/){target=_blank} and based on the [Luminus micro-framework template](https://luminusweb.com/){target=_blank}.

The project runs on the Undertow web server (wrapped by immutant), using ring to manage web requests and responses, with compojure for server-side routing.  The application uses mount to manage the application lifecycle.

[Fork the CircleCI-Public/circleci-demo-clojure-luminus](https://github.com/CircleCI-Public/circleci-demo-clojure-luminus/fork){target=_blank} project on your GitHub or GitLab account or organisation.

Go to the CircleCI dashboard and login.  Select the GitHub / GitLab organisation you want to work with, this will list the repositories in that organisation.

![Circle CI Dashboard - Select an organisation and its projects](/images/circle-ci-dashboard-select-organisation.png)

Find the project in the list of repositories for that organisation

![Circle CI Dashboard - Luminus project ](/images/circle-ci-dashboard-projects-repo-search-circleci.png)

Click on the "Set Up Project" button and select the Clojure configuration from the drop-down menu.

![Circle CI Dashboard - Set Up Project on CircleCI using the example repository](/images/circle-ci-dashboard-projects-luminus-configuration-clojure.png)

This template seems to be older than the sample configuration on the [Clojure language page](https://circleci.com/docs/2.0/language-clojure/){target=_blank}.  Copy the sample configuration and paste it into the editor.  Then press Add Config to automatically add it to your code repository.

This will start a build and show the pipelines dashboard, with the project running the tasks defined in the configuration

![Circle CI Dashboard - Luminus project ](/images/clojure-ci-pipelines-luminus-running.png)

Oh, it failed...

![Circle CI Dashboard - Luminus project build failed](/images/circle-ci-dashboard-pipelines-luminus-failed.png)

Clicking on the FAILED button shows details of that particular pipeline.  This opens the build report for the pipeline.

The build report shows all the steps that have passed and the details of the step which has failed, in this case lein do test, uberjar

![Circle CI Dashboard - Luminus project build report](/images/circle-ci-dashboard-build-luminus-failed-details-uberjar.png)

> #### Hint::Failing on Java 11
> The example project only seems to run on Java 8.  Running the project locally with either `lein run` or `lein test`

Edit the `.circleci/config.yml` file in your fork and change the images used to `openjdk-8-lein-2.9.3`.

> #### Hint::Cannot edit configuration via dashboard
> Apart from the initial creation of the configuration, its not possible to edit the configuration via the dashboard.

Then commit the change to the code in the code repository. Another build will run automatically.

![Circle CI Dashboard - Luminus project running second build](/images/circle-ci-dashboard-pipeline-luminus-running-second-time.png)

The dashboard shows the second build of this pipeline, showing the new commit just pushed

![Circle CI Dashboard - Luminus project second build successful](/images/circle-ci-dashboard-pipeline-luminus-second-build-success.png)

Success.  Now development can continue knowing the configuration of the pipeline works.
