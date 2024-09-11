# Sirma Academy final exam

## Understanding of the task

### Input

CSV files must be uploaded by the user. The app should work for every tournament, with 24 teams and 6 groups, not only for EURO 2024.

After uploading all files user will be redirected to groups page.

### Groups and brackets

Matches should be divided in two parts: Groups and Qualifications (Where bracket view should be applyied).

### Match and team details

Match details page should contains detailed information about the match: match result, formation, team squad, events (records) from the match.

## My algorithm and finished tasks

### Input explanation

readCSVFile() in [FileUtils.js](src/utils/FileUtils.js) is responsible for file uploading all data is validated by [InputValidator.js](src/validation/InputValidator.js). [UploadCard.js](src/components/UploadCard.jsx) is component that trigger file uploading. [UploadCardsContainer.js](src/components/UploadCardsContainer.jsx) is container component for UploadCard.js and contains array of elements rendered by UploadCard.js and they have custom validations and action that after uploading every different data like: matches, players, record and teams are stored in different store slice with redux-toolkit.

### Groups and brackets explanation

[FixturesResultsPage.jsx](src/pages/FixturesResultsPage.jsx) use collectGroupMatches() function from [MatchUtils.js](src/utils/MatchUtils.js) to filter only matches that are before group ending date. And collects them in Map with keys Group of the matches.

[BracketsPage.jsx](src/pages/BracketsPage.jsx) use collectQualificationMatches() function from [MatchUtils.js](src/utils/MatchUtils.js) which collects all matches after group ending date in map and then combineQualificationMatches() function creates tree structured object with all matches. Root object is the Final match. buildNodes() function checks for every children element if matchID matches of their children matchID.

[BracketsView.jsx](src/components/brackets/BracketsView.jsx) and [BracketNode.jsx](src/components/brackets/BracketNode.jsx) render the tree object in the DOM. BracketNode.jsx is rendered recursively until the last children is reached.

### Match and details explanation

All component for that task is located in [match](src/components/match) and [teams](src/components/teams) folders. Team formation task is not started yet.
