# Release Process

You can follow the steps below to perform a new release:

1. Ensure `README.md` is up-to-date with whatever changes made to the specification or types
2. Ensure the `myhealth-webcomponent-specification-v*.pdf` file has been updated with the corresponding specification version.
3. Ensure a new entry has been added to the `CHANGELOG.md` file for the new version
4. Issue `npm version <major|minor|patch>` in the `main` branch to update the version info and generate a corresponding git tag
5. `git push` the latest commits. Do not git push the tag just yet
6. Verify that the build pipeline completes successfully
7. `git push` the version tag and verify a new draft release gets created in the GitHub repository
8. Update the draft release content with something similar to the added content in the `CHANGELOG.md` and hit the `Publish Release` button
9. This will kick off the publish pipeline, which will publish the new version of the library to the official NPM registry.
