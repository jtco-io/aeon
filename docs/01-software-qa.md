# Code and Software quality assurance.

Software quality assurance is how save our customers money and or ave us time as a developer. 

This means 
* Distilling feature request into into deliverables
* which have identified any complexity or technical debt and are insured against the fore mentioned.

These features should then be automatically.
* Verified through testing
* Check performance and regressions

Immutable versions of code are released and can be manually inspected in a staging environment or released manually or automatically to production.

## Pre Commit
* prettier
* Typescript & ts-lint
* jest

## CI
The first CI stage will run the same commands as pre-commit, while the second stage runs selenium test.
