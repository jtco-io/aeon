# Code and Software quality assurance.

Software quality assurance is how save our customers money and or ave us time as a developer. 

This means 
* Distilling feature request into into deliverables
* which have identified any complexity or technical debt and are insured against the fore mentioned.

These features should then be automatically.
* Verified through testing
* Check performance and regressions

Immutable versions of code are released and can be manually inspected in a staging environment or released manually or automatically to production.


### Workflow

1. Identify Feature or Issue
1. Create Issue on however you manage projects.
    * Create Branch 
        * Preferably the merge request is automatically
        * Said early merge request and branch push gives us a CI confirmation point
1. Identify how to do a thorough test suite for the feature a simply and minimally as possible.
1. Exicute and release
        
        
## Pre Commit
* prettier
* Typescript & ts-lint
* jest

## CI
The first CI stage will run the same commands as pre-commit, while the second stage runs selenium test.
