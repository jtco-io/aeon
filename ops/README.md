# Ops

Prion in addition to be a cutting edge software, utilizes an automated test,
build and deploy chain that is to say [CI](https://en.wikipedia.org/wiki/Continuous_integration)
& [CD](https://en.wikipedia.org/wiki/Continuous_delivery).

When we say maintain momentum it means issues like the one below from the Wikipeida CI article can be prevented.


```
The main aim of CI is to prevent integration problems, referred to as
"integration hell"...

CI is not universally accepted as an improvement over frequent integration,
so it is important to distinguish between the two as there is disagreement
about the virtues of each.[citation needed]

..CI was intended to be used in combination with automated unit tests
written through the practices of test-driven development.
Initially this was conceived of as running and passing all unit tests in
the developer's local environment before committing to the mainline.
This helps avoid one developer's work-in-progress breaking another developer's copy.

...cont Eventually, the repository may become so different from the developers'
baselines that they enter what is sometimes referred to as "merge hell",
or "integration hell",[4] where the time it takes to integrate exceeds
the time it took to make their original changes.

Continuous integration involves integrating early and often, so as to avoid the pitfalls of "integration hell". The practice aims to reduce rework and thus reduce cost and time.
```


In addition to testing cogntive load is reduced by using typechecking,
linters and code formaters like prettier. As there are many way to style
code(Arrow vs Named functions for instance in Javascript for instance)

Each time Webpack builds it is linted for errors. When code is committed
it is automatically prettified using prettier. When it's pushed the
production version is build to insure the build and lint passes.

Gitlab CI will then run through that whole process and the build and test
docker, maybe deploying.

Without getting overcomplicated just getting your server running an able
to respond to a curl request is a better check than most code will see.

Be very hesitant of building anything super brittle that could for instance
increase CI time or add false postives.


Don't make a string of your graphql request for instance use a jest snapshot and just remake that snapshot if anything changes.



[Software quality assurance](https://en.wikipedia.org/wiki/Software_quality_assurance)
A means of monitoring the software engineering processes and methods used to ensure quality.


That is we build and test a final version of our application using Docker(black box testing).

The same image after being tested is deployed, monitored and rolled back
to a stable image if needed.

[SysOps](https://en.wikipedia.org/wiki/Sysop) - an administrator of a multi-user computer system

[DevOps](https://en.wikipedia.org/wiki/DevOps) -
A software engineering culture and practice that aims at unifying software development (Dev) and software operation (Ops).

* Code — code development and review, source code management tools, code merging
* Build — continuous integration tools, build status
* Test — continuous testing tools that provide feedback on business risks
* Package — artifact repository, application pre-deployment staging
* Release — change management, release approvals, release automation
* Configure — infrastructure configuration and management, Infrastructure as Code tools
* Monitor — applications performance monitoring, end–user experience


[SRE](https://en.wikipedia.org/wiki/Site_Reliability_Engineering)
A discipline that incorporates aspects of software engineering and applies that to IT operations problems.
The main goals are to create ultra-scalable and highly reliable software systems.

A site reliability engineer (SRE) will spend up to 50% of their time doing "ops" related work such as issues, on-call, and manual intervention. Since the software system that an SRE oversees is expected to be highly automatic and self-healing, the SRE should spend the other 50% of their time on development tasks such as new features, scaling or automation.



