TF = docker-compose run --rm tf

build:
	cd resume-app && npm install && npm run build

deploy: apply build
	aws s3 sync resume-app/dist/ s3://cameroncraddock.net --delete

apply: plan
	$(TF) apply $(TF_WORKSPACE).tfplan
	rm $(TF_WORKSPACE).tfplan

plan: init
	$(TF) plan -out $(TF_WORKSPACE).tfplan

init:
	$(TF) init
