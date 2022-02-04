Steps to migrate to OS @ Github

1. Clean Repo from all CompReferences

2. Create Github Repo (schwarzit/api-linter-service)

3. Release Source Code om Github

4. Create ADO Pipeline with cron job to make git diff on OS repo

5. If git diff create pull request against odj ado repo

6. Extract env config for nest into separate file

7. Create step in odj release pipeline to revert changes (unstage) on odj env specific variables

8. Create Github Actions based CI for OS Pull Requests

[08.12.21 16:36] Patrick Hahn
Ich bin mal durch das API-Linter Repo gegangen, mir ist folgendes aufgefallenPress-Release Referenz:https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/example_specs/example_digital-twin.json&version=GBmaster&line=335&lineEnd=336&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contentsIch würde hier vorschlagen, den Link zu den Company best practises konfigurierbar zu machen, da wohl jede Firma etwas eigenes haben wird...
Interner Chat (API Management - Support for Consumers):https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/openapi/oas_3.json&version=GBmaster&line=113&lineEnd=113&lineStartColumn=21&lineEndColumn=232&lineStyle=plain&_a=contentsAls URL würde ich vorschlagen, da bereits das GitHub-Repo reinzupacken, dann kann das gleich released werden: https://github.com/schwarzit/node-spectral-api-linterInterne URL? (*.prod.sys.odj.cloud)https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/openapi/oas_3.json&version=GBmaster&line=128&lineEnd=129&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contentsInterner Link zum Press Release:https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/openapi/oas_3.json&version=GBmaster&line=174&lineEnd=175&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contents
undhttps://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/openapi/oas_3.json&version=GBmaster&line=206&lineEnd=207&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contentsEbenso im OpenAPI 2.0Sind die API-Typen allgemein anwendbar, oder sollte das möglicherweise konfigurierbar sein? Intern mag das reichen, aber als OpenSource finde ich konfigurierbar, mit einem Endpoint fürs auslesen aller verfügbaren Typen passender:https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/src/helpers/enum.api-type.tsLink zum Press-Releasehttps://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/src/lintings/created-linting.dto.ts&version=GBmaster&line=15&lineEnd=16&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contentsLink zu onedirection.schwarz:https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/src/lintings/lintings.service.ts&version=GBmaster&line=54&lineEnd=55&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contentsVerweise auf ODJ:https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/src/main.ts&version=GBmaster&line=16&lineEnd=16&lineStartColumn=15&lineEndColumn=18&lineStyle=plain&_a=contents
Meine Empfehlung wäre hier die genauen Namen der Env-Variablen in einer Klasse als Implementierungsdetail wegzukapseln und zusätzlich zu den ODJ_ Env-Variablen noch nicht-ODJ Varianten anzubieten.Interner Teams-Link:https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/src/main.ts&version=GBmaster&line=91&lineEnd=92&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contentsPress-Release-Link:https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/src/main.ts&version=GBmaster&line=100&lineEnd=101&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contentsUnrelated zum Open-Sourcen: Gibt es hier nicht die Möglichkeit einen konkreteren Typ als any zu verwenden?https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/src/oas-validation.interface.ts&version=GBmaster&line=2&lineEnd=2&lineStartColumn=11&lineEndColumn=14&lineStyle=plain&_a=contents

[08.12.21 16:36] Patrick Hahn
Möglicherweise noch ein Kommentar oben hin, dass das die odj-azure-pipeline.yml fürs interne Build/Release-System gedacht ist, und nicht beachtet werden soll:https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/odj-azure-pipeline.ymlDer SPDX identifier für Apache 2.0 ist "Apache-2.0". npm verwendet diesen Identifier für das license field in der package.json. D.h. "APACHE 2.0" -> "Apache-2.0"https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/package.json&version=GBmaster&line=7&lineEnd=8&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contentsBei der Mehrzahlbildung wird im Englischen kein Apostroph angehängt, d.h. "APIs" ist korrekt: https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/README.md&version=GBmaster&line=5&lineEnd=5&lineStartColumn=88&lineEndColumn=89&lineStyle=plain&_a=contentsREADME enthält einen Verweis auf ODJ:https://dev.azure.com/schwarzit/schwarzit.odj.apigw/_git/api-linter?path=/README.md&version=GBmaster&line=7&lineEnd=7&lineStartColumn=1&lineEndColumn=61&lineStyle=plain&_a=contents

